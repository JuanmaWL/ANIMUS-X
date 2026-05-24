import React, { useEffect, useState } from 'react';
import { useAppSound, SOUND_ASSETS } from '../../hooks/useAppSound';
import { useI18n } from '../../contexts/I18nContext';
import { GlitchText } from './GlitchText';
import { HudDots } from './HudDots';
import { AnimusLogo } from './AnimusLogo';
import { AbstergoLogo } from './AbstergoLogo';
import { cn } from '../../utils/cn';

export function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [isVisible, setIsVisible] = useState(true);
  const [step, setStep] = useState(0);
  const [playBoot] = useAppSound(SOUND_ASSETS.ANIMUS.BOOT);
  const { t } = useI18n();

  useEffect(() => {
    playBoot();

    const t1 = setTimeout(() => setStep(1), 800);
    const t2 = setTimeout(() => setStep(2), 2000);
    const t3 = setTimeout(() => setStep(3), 3200);

    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 800); // 800ms for fade out animation
    }, 5500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(timer);
    };
  }, [playBoot, onComplete]);

  return (
    <div 
      className={cn(
        "fixed inset-0 z-[100] flex flex-col items-center justify-center bg-animus-bg dark:bg-animus-bg-dark transition-opacity duration-500",
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden z-0">
        <AbstergoLogo disableSpin className="w-[150%] max-w-[800px] text-black/10 dark:text-white/10 glitch-svg" />
      </div>

      <div className="absolute top-1/4 left-4 sm:left-10 text-animus-cyan/40 dark:text-animus-cyan/20 font-mono text-[10px] sm:text-xs pointer-events-none select-none z-0">
        <pre className="animate-pulse">
          INIT_SEQUENCE_v1.28...{'\n'}
          MEM_CHECK_BIOS...[OK]{'\n'}
          SYNCHRONIZING_DNA...{'\n'}
          CONNECTING_TO_HOST...{'\n'}
          SSL_HANDSHAKE_ESTABLISHED
        </pre>
      </div>

      <div className="absolute bottom-1/4 right-4 sm:right-10 text-right text-animus-cyan/40 dark:text-animus-cyan/20 font-mono text-[10px] sm:text-xs pointer-events-none select-none z-0">
        <pre className="opacity-70">
          SYS.CORE: ONLINE{'\n'}
          V.TRACING: ACTIVE{'\n'}
          AURA_ENGINE: 98%{'\n'}
          BLEEDING_EFFECT: STABLE
        </pre>
      </div>

      <div className={cn("transition-opacity duration-500", step >= 1 ? "opacity-100" : "opacity-0 scale-95")}>
        <AnimusLogo className="w-32 h-32 mb-8" />
      </div>
      
      <div className={cn("transition-opacity duration-500 delay-100", step >= 2 ? "opacity-100" : "opacity-0 translate-y-4")}>
        <h1 className="font-display text-2xl md:text-3xl text-animus-red font-black tracking-[0.2em] mb-4 uppercase text-center w-full px-4 leading-relaxed">
          <GlitchText>ANIMUS SYSTEM ONLINE</GlitchText>
        </h1>
        <HudDots count={20} className="w-64 mb-8 mx-auto" />
      </div>
      
      <div className={cn("transition-opacity duration-300", step >= 3 ? "opacity-100" : "opacity-0")}>
        <p className="font-mono text-lg text-animus-text dark:text-animus-text-dark tracking-widest uppercase animate-pulse">
          {t('splash.welcome')}
        </p>
      </div>

      {/* Brackets de carga (HUD decorativo) */}
      <div className="absolute top-8 left-8 w-12 h-12 border-t-4 border-l-4 border-animus-cyan opacity-80" />
      <div className="absolute top-8 right-8 w-12 h-12 border-t-4 border-r-4 border-animus-cyan opacity-80" />
      <div className="absolute bottom-8 left-8 w-12 h-12 border-b-4 border-l-4 border-animus-cyan opacity-80" />
      <div className="absolute bottom-8 right-8 w-12 h-12 border-b-4 border-r-4 border-animus-cyan opacity-80" />
    </div>
  );
}
