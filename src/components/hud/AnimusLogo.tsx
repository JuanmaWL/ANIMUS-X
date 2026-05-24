import { cn } from '../../utils/cn';

export function AnimusLogo({ className }: { className?: string }) {
  return (
    <div className={cn("relative flex items-center justify-center p-1", className)}>
      {/* Background Hexagon and X */}
      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full text-animus-cyan" fill="currentColor">
        {/* Hexagon with point facing up */}
        <polygon points="50,2 91,25 91,75 50,98 9,75 9,25" fill="none" stroke="currentColor" strokeWidth="4" className="opacity-80" />
        <polygon points="50,8 86,28 86,72 50,92 14,72 14,28" fill="currentColor" fillOpacity="0.1" />
        
        {/* Big X behind (moved up slightly) */}
        <text x="50" y="50" textAnchor="middle" dominantBaseline="central" alignmentBaseline="central" className="font-display font-black text-animus-red opacity-80" fontSize="76" style={{ filter: 'drop-shadow(0px 0px 4px rgba(232,69,60,0.8))' }}>
          X
        </text>
      </svg>
      
      {/* ANIMUS Text in front */}
      <div className="relative font-display font-bold text-white text-[10px] sm:text-[11px] md:text-sm tracking-[0.3em] z-10 leading-none text-center uppercase" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.9), 0 0 2px rgba(0,0,0,1), 0 0 6px rgba(0,0,0,0.8)' }}>
        ANIMUS
      </div>
    </div>
  );
}
