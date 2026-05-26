import React from 'react';
import { cn } from '../../utils/cn';

export function AbstergoLogo({ className, disableSpin = false }: { className?: string, disableSpin?: boolean }) {
  return (
    <div
      className={cn(
        "bg-current", // This will keep the same text/color inheritance it had before with fill="currentColor"
        !disableSpin && "animate-[spin_20s_linear_infinite]",
        className
      )}
      style={{
        maskImage: 'url(/images/ABSTERGO_LOGO.svg)',
        WebkitMaskImage: 'url(/images/ABSTERGO_LOGO.svg)',
        maskSize: 'contain',
        WebkitMaskSize: 'contain',
        maskRepeat: 'no-repeat',
        WebkitMaskRepeat: 'no-repeat',
        maskPosition: 'center',
        WebkitMaskPosition: 'center',
        transformOrigin: '50% 50%'
      }}
    />
  );
}

