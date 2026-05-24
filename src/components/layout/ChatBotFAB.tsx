import { MessageSquareText } from 'lucide-react';
import { cn } from '../../utils/cn';
import { APP_CONFIG } from '../../config';

export function ChatBotFAB({ className }: { className?: string }) {
  if (!APP_CONFIG.aurora.enabled) return null;

  return (
    <button
      className={cn(
        "fixed bottom-24 right-6 w-16 h-16 rounded-full bg-transparent outline-none transition-all z-50 animate-[bounce_4s_ease-in-out_infinite]",
        "flex items-center justify-center group overflow-visible",
        className
      )}
      onClick={() => alert(APP_CONFIG.aurora.initialMessage)}
      title="Iniciar AURORA"
    >
      {/* Halo Exterior Brillante */}
      <div className="absolute inset-0 -m-2 rounded-full bg-animus-cyan/30 blur-xl group-hover:bg-animus-cyan/50 group-hover:scale-125 transition-all duration-500 ease-out" />
      
      {/* Anillo orbital */}
      <div className="absolute inset-0 rounded-full border-2 border-animus-cyan/40 border-t-animus-cyan/80 animate-[spin_6s_linear_infinite]" />
      <div className="absolute inset-1 rounded-full border border-animus-cyan/20 border-b-animus-cyan/60 animate-[spin_4s_linear_infinite_reverse]" />
      
      {/* Núcleo Central (Orbe) */}
      <div className="absolute w-10 h-10 rounded-full bg-gradient-to-tr from-animus-cyan to-white blur-[2px] opacity-90 group-hover:opacity-100 group-hover:shadow-[0_0_20px_#fff] transition-all duration-300 shadow-[0_0_15px_#00cfcf] animate-pulse" />
      
      {/* Destello del núcleo interno */}
      <div className="absolute w-3 h-3 rounded-full bg-white opacity-90 blur-[1px] group-hover:scale-110 transition-transform" />
    </button>
  );
}
