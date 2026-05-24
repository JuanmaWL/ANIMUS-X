import React from 'react';
import { cn } from '../../utils/cn';

export function HudDots({ className, count = 10 }: { className?: string, count?: number }) {
  return (
    <div className={cn("flex space-x-1.5 items-center justify-center opacity-70", className)}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="w-1.5 h-1.5 bg-animus-cyan rounded-none rotate-45 transform" />
      ))}
    </div>
  );
}
