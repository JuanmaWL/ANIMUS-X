import React, { useState, useEffect } from 'react';
import { cn } from '../../utils/cn';

const SYSTEM_BOOT_SEQUENCE = [
  "INIT_SEQUENCE_v4.0.0",
  "MEM_CHECK_BIOS...[OK]",
  "MOUNTING_VIRTUAL_DRIVE...",
  "LOADING_KERNEL_MODULES",
  "BYPASSING_ABSTERGO_FIREWALL",
  "SSL_HANDSHAKE_ESTABLISHED",
  "SYS.CORE: ONLINE",
  "AURA_ENGINE: 100%",
  "NEURAL_LINK: STATUS_GREEN",
  "AWAITING_USER_INPUT..."
];

const DNA_SEQUENCE_FRAGMENTS = [
  "> CONNECTING TO CLOUD DB...",
  "> FETCHING ANCESTOR MEMORIES...",
  "> DECRYPTING FRAGMENT #824...",
  "> ANALYZING TEMPLAR ENCRYPTION...",
  "> OVERRIDING SECURITY PROTOCOLS...",
  "> ACCESSING HIDDEN FILES...",
  "> LOADING SIMULATION NODE A...",
  "> ESTABLISHING NEURAL PATHWAY...",
  "> V-TRACING ACTIVE",
  "> BLEEDING EFFECT NEUTRALIZED"
];

function TypewriterConsole({ 
  sequence, 
  delay = 0, 
  className,
  align = 'left' 
}: { 
  sequence: string[], 
  delay?: number, 
  className?: string,
  align?: 'left' | 'right'
}) {
  const [typedLines, setTypedLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState('');
  const [fragmentIndex, setFragmentIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setIsStarted(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  useEffect(() => {
    if (!isStarted) return;
    
    const fragment = sequence[fragmentIndex];
    if (!fragment) return;

    if (charIndex < fragment.length) {
      const timeout = setTimeout(() => {
        setCurrentLine(prev => prev + fragment[charIndex]);
        setCharIndex(c => c + 1);
      }, 15 + Math.random() * 30); // fast typing speed
      return () => clearTimeout(timeout);
    } else {
      // Line finished typing
      const timeout = setTimeout(() => {
        setTypedLines(prev => {
          const newLines = [...prev, fragment];
          return newLines.slice(-2); // keep only 2 finished lines + 1 typing = 3 max
        });
        setCurrentLine('');
        setCharIndex(0);
        setFragmentIndex(i => (i + 1) % sequence.length);
      }, 800 + Math.random() * 1000); // Wait before next line
      return () => clearTimeout(timeout);
    }
  }, [charIndex, fragmentIndex, isStarted, sequence]);

  return (
    <div className={cn("flex flex-col font-mono font-bold text-animus-cyan dark:text-animus-cyan-bright text-[9px] sm:text-[11px] md:text-[12px] whitespace-nowrap drop-shadow-[0_0_2px_rgba(0,153,153,0.5)]", align === 'right' ? 'items-end text-right' : 'items-start text-left', className)}>
      <div className={cn("flex flex-col", align === 'right' ? 'items-end' : 'items-start')}>
        {typedLines.map((line, i) => (
          <div key={i} className="mb-1 opacity-90">{line}</div>
        ))}
      </div>
      <div className="flex items-center">
        <span>{currentLine}</span>
        <span className="w-1.5 h-3 md:h-4 ml-1 bg-animus-cyan dark:bg-animus-cyan-bright animate-[blink_1s_step-end_infinite]"></span>
      </div>
    </div>
  );
}

export function BackgroundConsole({ className }: { className?: string }) {
  return (
    <div className={cn("absolute inset-0 pointer-events-none select-none overflow-hidden z-0 flex flex-col justify-between opacity-90 mix-blend-normal dark:mix-blend-screen", className)}>
      
      {/* Top Right */}
      <div className="absolute top-8 right-4 md:top-12 md:right-8 w-auto max-w-[80vw] sm:max-w-[200px] md:max-w-[300px]">
        <TypewriterConsole sequence={SYSTEM_BOOT_SEQUENCE} delay={0} align="right" />
      </div>

      {/* Bottom Left - DNA sequence */}
      <div className="absolute bottom-2 left-2 sm:bottom-6 sm:left-4 md:bottom-12 md:left-8 w-auto max-w-[80vw] sm:max-w-[220px] md:max-w-[350px]">
        <TypewriterConsole sequence={DNA_SEQUENCE_FRAGMENTS} delay={800} align="left" />
      </div>
    </div>
  );
}
