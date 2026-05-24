import React from 'react';
import { cn } from '../../utils/cn';

interface HudFrameProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function HudFrame({ children, className, ...props }: HudFrameProps) {
  return (
    <div className={cn("relative p-4 border border-animus-border/30 dark:border-animus-border-dark/30 bg-animus-panel/20 dark:bg-animus-panel-dark/20 backdrop-blur-sm", className)} {...props}>
      {/* Esquinas (Corner Brackets) Cian */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-animus-cyan" />
      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-animus-cyan" />
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-animus-cyan" />
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-animus-cyan" />
      
      {/* Contenido */}
      <div className="relative z-10 w-full h-full text-animus-text dark:text-animus-text-dark">
        {children}
      </div>
    </div>
  );
}
