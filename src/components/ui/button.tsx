import * as React from 'react';
import { cn } from '../../lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    const variants = {
      default: 'bg-brand-700 text-white hover:bg-brand-800 shadow-xs',
      secondary: 'bg-slate-100 text-slate-900 hover:bg-slate-200',
      outline: 'border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 shadow-xs',
      ghost: 'hover:bg-slate-100 text-slate-700',
      destructive: 'bg-rose-600 text-white hover:bg-rose-700 shadow-xs'
    };

    const sizes = {
      default: 'h-9 px-4 py-2 text-xs font-semibold rounded-lg',
      sm: 'h-8 px-3 text-xs font-semibold rounded-md',
      lg: 'h-10 px-5 text-sm font-semibold rounded-lg',
      icon: 'h-8 w-8 p-0 rounded-lg'
    };

    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center gap-1.5 whitespace-nowrap transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-brand-500 disabled:pointer-events-none disabled:opacity-50 cursor-pointer',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';
