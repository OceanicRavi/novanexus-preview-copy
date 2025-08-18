import { cn } from '../lib/utils';
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'default' | 'lg';
}

export function Button({
  className,
  variant = 'default',
  size = 'default',
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 disabled:pointer-events-none disabled:opacity-50',
        {
          'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 shadow-sm': variant === 'default',
          'border border-gray-600 bg-gray-800/30 hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-purple-600/20 text-white hover:border-blue-500': variant === 'outline',
          'hover:bg-gray-800/50 text-gray-300 hover:text-white': variant === 'ghost',
          'h-8 px-3 text-sm': size === 'sm',
          'h-10 px-4': size === 'default',
          'h-12 px-6 text-lg': size === 'lg',
        },
        className
      )}
      {...props}
    />
  );
}