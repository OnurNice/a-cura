import { Client, Employee, Tour, TourStop } from '../types';
import { A_CURA_HQ } from '../data/mockData';

// Haversine formula to calculate distance between two coordinates in km
export function calculateDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const directDistance = R * c;

  // Multiply by urban road detour factor (in German medieval/river towns like Wetzlar ~1.4x)
  return Math.round(directDistance * 1.38 * 10) / 10;
}

// Estimate travel duration in minutes based on urban traffic in Wetzlar (~28 km/h + 3 min parking/arrival buffer)
export function estimateTravelMinutes(distanceKm: number): number {
  const drivingMinutes = Math.round((distanceKm / 28) * 60);
  return Math.max(4, drivingMinutes + 3); // minimum 4 minutes between any two houses
}

// Format minutes from midnight to HH:mm
export function minutesToTime(minutes: number): string {
  const hrs = Math.floor(minutes / 60) % 24;
  const mins = minutes % 60;
  return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
}

export function timeToMinutes(timeStr: string): number {
  const [h, m] = timeStr.split(':').map(Number);
  return (h || 0) * 60 + (m || 0);
}

// 2-Opt and Nearest Neighbor Algorithm for Route Optimization
export function optimizeTourRoute(
  tour: Tour,
  allClients: Client[],
  allEmployees: Employee[],
  startHour: number = 7,
  startMinute: number = 0
): {
  optimizedTour: Tour;
  distanceSavedKm: number;
  timeSavedMinutes: number;
  co2SavedKg: number;
  warnings: string[];
} {
  const warnings: string[] = [];
  const assignedDriver = allEmployees.find(e => e.id === tour.driverId);

  // Fetch client objects for each stop
  const clientsInTour = tour.stops
    .map(stop => allClients.find(c => c.id === stop.clientId))
    .filter((c): c is Client => Boolean(c));

  if (clientsInTour.length <= 1) {
    return {
      optimizedTour: tour,
      distanceSavedKm: 0,
      timeSavedMinutes: 0,
      co2SavedKg: 0,
      warnings: []
    };
  }

  // Check qualifications for SGB V treatment care
  if (assignedDriver) {
    const hasFachkraftQual = assignedDriver.qualifications.some(
      q => q.includes('Fachkraft') || q.includes('Altenpfleger') || q.includes('Gesundheits') || q.includes('Wund')
    );
    for (const client of clientsInTour) {
      if (client.requiresQualifiedNurse && !hasFachkraftQual) {
        warnings.push(
          `Achtung: Patient ${client.name} benötigt SGB V Behandlungspflege, Fahrer ${assignedDriver.name} hat jedoch keine examinierte Fachkraft-Befähigung!`
        );
      }
    }
  }

  // Calculate unoptimized initial distance
  let unoptimizedDistance = 0;
  let currentLat = A_CURA_HQ.lat;
  let currentLng = A_CURA_HQ.lng;
  for (const client of clientsInTour) {
    unoptimizedDistance += calculateDistanceKm(currentLat, currentLng, client.lat, client.lng);
    currentLat = client.lat;
    currentLng = client.lng;
  }
  // Return to HQ
  unoptimizedDistance += calculateDistanceKm(currentLat, currentLng, A_CURA_HQ.lat, A_CURA_HQ.lng);
  unoptimizedDistance = Math.round(unoptimizedDistance * 10) / 10;

  // Nearest Neighbor Optimization from HQ
  const unvisited = [...clientsInTour];
  const orderedClients: Client[] = [];
  let curLat = A_CURA_HQ.lat;
  let curLng = A_CURA_HQ.lng;

  while (unvisited.length > 0) {
    let nearestIdx = 0;
    let shortestDist = Infinity;

    for (let i = 0; i < unvisited.length; i++) {
      const dist = calculateDistanceKm(curLat, curLng, unvisited[i].lat, unvisited[i].lng);
      if (dist < shortestDist) {
        shortestDist = dist;
        nearestIdx = i;
      }
    }

    const nextClient = unvisited.splice(nearestIdx, 1)[0];
    orderedClients.push(nextClient);
    curLat = nextClient.lat;
    curLng = nextClient.lng;
  }

  // 2-Opt refinement for fine-tuning crossing paths
  let improved = true;
  while (improved) {
    improved = false;
    for (let i = 0; i < orderedClients.length - 1; i++) {
      for (let k = i + 1; k < orderedClients.length; k++) {
        // Calculate distance delta if we reverse segment i..k
        const prevA = i === 0 ? A_CURA_HQ : orderedClients[i - 1];
        const nodeA = orderedClients[i];
        const nodeB = orderedClients[k];
        const nextB = k === orderedClients.length - 1 ? A_CURA_HQ : orderedClients[k + 1];

        const currentDist =
          calculateDistanceKm(prevA.lat, prevA.lng, nodeA.lat, nodeA.lng) +
          calculateDistanceKm(nodeB.lat, nodeB.lng, nextB.lat, nextB.lng);

        const newDist =
          calculateDistanceKm(prevA.lat, prevA.lng, nodeB.lat, nodeB.lng) +
          calculateDistanceKm(nodeA.lat, nodeA.lng, nextB.lat, nextB.lng);

        if (newDist < currentDist - 0.2) {
          // Reverse sub-array
          const reversed = orderedClients.slice(i, k + 1).reverse();
          orderedClients.splice(i, k - i + 1, ...reversed);
          improved = true;
        }
      }
    }
  }

  // Calculate final optimized distance & timeline schedule
  let optimizedDistance = 0;
  let currentMinute = startHour * 60 + startMinute;
  curLat = A_CURA_HQ.lat;
  curLng = A_CURA_HQ.lng;

  const newStops: TourStop[] = [];

  for (let idx = 0; idx < orderedClients.length; idx++) {
    const c = orderedClients[idx];
    const travelKm = calculateDistanceKm(curLat, curLng, c.lat, c.lng);
    const travelMin = estimateTravelMinutes(travelKm);

    optimizedDistance += travelKm;
    currentMinute += travelMin;

    const arrivalTime = minutesToTime(currentMinute);
    const careDuration = c.durationMinutes || 35;
    const departureTime = minutesToTime(currentMinute + careDuration);
    currentMinute += careDuration;

    // Retain existing completion/vital data if stop already existed
    const existingStop = tour.stops.find(s => s.clientId === c.id);

    newStops.push({
      id: existingStop?.id || `stop-${tour.id}-${c.id}`,
      clientId: c.id,
      order: idx + 1,
      plannedArrival: arrivalTime,
      plannedDeparture: departureTime,
      actualArrival: existingStop?.actualArrival,
      actualDeparture: existingStop?.actualDeparture,
      status: existingStop?.status || 'pending',
      completedServices: existingStop?.completedServices || [],
      vitalRecord: existingStop?.vitalRecord,
      clientSignature: existingStop?.clientSignature,
      nurseNotes: existingStop?.nurseNotes
    });

    curLat = c.lat;
    curLng = c.lng;
  }

  // Add return distance to HQ
  const returnKm = calculateDistanceKm(curLat, curLng, A_CURA_HQ.lat, A_CURA_HQ.lng);
  optimizedDistance = Math.round((optimizedDistance + returnKm) * 10) / 10;

  const distanceSaved = Math.max(0, Math.round((unoptimizedDistance - optimizedDistance) * 10) / 10);
  const timeSavedMinutes = Math.round((distanceSaved / 28) * 60);
  const co2SavedKg = Math.round(distanceSaved * 0.17 * 10) / 10; // ~170g CO2/km in city stop-and-go

  const updatedTour: Tour = {
    ...tour,
    stops: newStops,
    totalDistanceKm: optimizedDistance,
    unoptimizedDistanceKm: unoptimizedDistance,
    fuelSavedKm: distanceSaved,
    co2SavedKg: co2SavedKg,
    totalDurationMin: currentMinute - (startHour * 60 + startMinute)
  };

  return {
    optimizedTour: updatedTour,
    distanceSavedKm: distanceSaved,
    timeSavedMinutes,
    co2SavedKg,
    warnings
  };
}
