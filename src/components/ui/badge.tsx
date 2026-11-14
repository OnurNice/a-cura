import * as React from 'react';
import { cn } from '../../lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'success' | 'destructive' | 'warning';
}

export function Badge({
  className,
  variant = 'default',
  ...props
}: BadgeProps) {
  const variants = {
    default: 'bg-brand-50 text-brand-700 border-brand-200/60 font-semibold',
    secondary: 'bg-slate-100 text-slate-700 border-slate-200 font-medium',
    outline: 'border-slate-200 text-slate-700 font-medium',
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200 font-semibold',
    warning: 'bg-amber-50 text-amber-700 border-amber-200 font-semibold',
    destructive: 'bg-rose-50 text-rose-700 border-rose-200 font-semibold'
  };

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] transition-colors',
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
