import React from 'react';
import { cn } from '../../utils/cn';

export function GlitchText({ children, className }: { children: React.ReactNode, className?: string }) {
  const textContent = typeof children === 'string' ? children : '';
  
  return (
    <span 
      className={cn("glitch-text", className)} 
      data-text={textContent}
    >
      {children}
    </span>
  );
}
