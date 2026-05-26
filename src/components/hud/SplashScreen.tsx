import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useAppSound, SOUND_ASSETS } from '../../hooks/useAppSound';
import { useI18n } from '../../contexts/I18nContext';
import { cn } from '../../utils/cn';
import { HugeAnimusLogo } from './HugeAnimusLogo';
import { AbstergoLogo } from './AbstergoLogo';
import { BackgroundConsole } from './BackgroundConsole';

export function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [playBoot] = useAppSound(SOUND_ASSETS.ANIMUS.BOOT);
  const [playClick] = useAppSound(SOUND_ASSETS.UI.CLICK);
  
  const { t, language, setLanguage } = useI18n();
  const { theme, setTheme, resolvedTheme } = useTheme();
  
  const currentTheme = theme === 'system' ? resolvedTheme : theme;

  useEffect(() => {
    // Play ambiance or boot sound continuously or once on mount
    playBoot();
    
    // Hide scroll on body
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [playBoot]);

  const handleEnter = () => {
    if (isExiting) return;
    playClick();
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
      onComplete();
    }, 800);
  };
  
  const toggleTheme = (e: React.MouseEvent) => {
    e.stopPropagation();
    playClick();
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
  };

  const toggleLanguage = (e: React.MouseEvent) => {
    e.stopPropagation();
    playClick();
    setLanguage(language === 'es' ? 'en' : language === 'en' ? 'fr' : 'es');
  };

  if (!isVisible) return null;

  return (
    <motion.div 
      className={cn(
        "fixed inset-0 w-full h-full z-[100] flex flex-col items-center justify-center bg-animus-bg dark:bg-[#060d10] overflow-hidden touch-none"
      )}
      initial={{ opacity: 1, scale: 1, filter: "blur(0px) brightness(1)" }}
      animate={isExiting ? {
        opacity: 0,
        scale: 1.1,
        filter: "blur(10px) brightness(1.5)"
      } : {
        opacity: 1,
        scale: 1,
        filter: "blur(0px) brightness(1)"
      }}
      transition={{ duration: 1.2, ease: [0.1, 0.8, 0.2, 1] }}
    >
      {/* Background glow and FX */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.1 }}
        className="absolute inset-0 pointer-events-none z-0 screen-glow mix-blend-screen opacity-50 dark:opacity-100"
      ></motion.div>
      
      {/* Background Hex Pattern */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="absolute inset-0 bg-[length:60px_60px] bg-[image:var(--background-image-hex-pattern)] opacity-[0.25] dark:opacity-[0.2] z-0 pointer-events-none animate-slow-hex"
      ></motion.div>

      {/* Mosaic blueprint grid overlay */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.3 }}
        className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
      >
        {/* Fine coordinate lines */}
        <div className="absolute left-[12%] top-0 bottom-0 w-[0.5px] bg-animus-cyan/20 dark:bg-animus-cyan/10 border-dashed border-animus-cyan/10"></div>
        <div className="absolute right-[12%] top-0 bottom-0 w-[0.5px] bg-animus-cyan/20 dark:bg-animus-cyan/10 border-dashed border-animus-cyan/10"></div>
        <div className="absolute top-[18%] left-0 right-0 h-[0.5px] bg-animus-cyan/20 dark:bg-animus-cyan/10 border-dashed border-animus-cyan/10"></div>
        <div className="absolute bottom-[18%] left-0 right-0 h-[0.5px] bg-animus-cyan/20 dark:bg-animus-cyan/10 border-dashed border-animus-cyan/10"></div>

        {/* Intersection marker crosshairs and labels - HIDDEN ON MOBILE */}
        <div className="absolute left-[12%] top-[18%] -translate-x-1/2 -translate-y-1/2 hidden md:flex flex-col items-start text-[8px] font-mono text-animus-cyan/50 dark:text-animus-cyan/40 select-none">
          <span className="font-bold">✦ SEC_C10</span>
          <span>LAT: 43.6150° N</span>
        </div>
        <div className="absolute right-[12%] top-[18%] translate-x-1/3 -translate-y-1/2 hidden md:flex flex-col items-end text-[8px] font-mono text-animus-cyan/50 dark:text-animus-cyan/40 select-none">
          <span className="font-bold">✦ MEM_U05</span>
          <span>LNG: 1.1240° E</span>
        </div>
        <div className="absolute left-[12%] bottom-[18%] -translate-x-1/2 translate-y-1/2 hidden md:flex flex-col items-start text-[8px] font-mono text-animus-cyan/50 dark:text-animus-cyan/40 select-none">
          <span className="font-bold">✦ SYS_SYN_R</span>
          <span>RATE: 99.8%</span>
        </div>
        <div className="absolute right-[12%] bottom-[18%] translate-x-1/3 translate-y-1/2 hidden md:flex flex-col items-end text-[8px] font-mono text-animus-cyan/50 dark:text-animus-cyan/40 select-none">
          <span className="font-bold">✦ NODE_AB_9</span>
          <span>UPLINK: SYS_OK</span>
        </div>

        {/* Fine Grid Mosaic Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,153,153,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(0,153,153,0.035)_1px,transparent_1px)] bg-[size:60px_60px] dark:bg-[linear-gradient(rgba(0,240,224,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,224,0.02)_1px,transparent_1px)] animate-slow-grid"></div>
        
        {/* Side vertical/horizontal mini tick metrics - HIDDEN ON MOBILE */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-1 text-[7px] font-mono text-animus-cyan/30 select-none">
          {['00', '10', '20', '30', '40', '50', '60', '70', '80', '90'].map(num => (
            <div key={num} className="flex items-center gap-1">
              <span>—</span><span>{num}</span>
            </div>
          ))}
        </div>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-1 text-[7px] font-mono text-animus-cyan/30 items-end select-none">
          {['90', '80', '70', '60', '50', '40', '30', '20', '10', '00'].map(num => (
            <div key={num} className="flex items-center gap-1">
              <span>{num}</span><span>—</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Screen CRT and Scanlines overlay */}
      <div className="absolute inset-0 bg-[length:4px_4px] bg-[image:var(--background-image-dot-grid)] opacity-[0.2] dark:opacity-[0.15] z-[1] pointer-events-none mix-blend-overlay"></div>
      <div className="absolute inset-x-0 h-[2px] bg-animus-cyan/30 opacity-60 animate-[scan_4s_linear_infinite] shadow-[0_0_10px_rgba(0,153,153,0.8)] z-[1] pointer-events-none"></div>

      {/* Tech UI Corner bracket lines */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="absolute top-6 left-6 w-16 h-16 border-t-[1.5px] border-l-[1.5px] border-animus-cyan/40 pointer-events-none z-10 hidden sm:block"
      ></motion.div>
      <motion.div 
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="absolute top-6 right-6 w-16 h-16 border-t-[1.5px] border-r-[1.5px] border-animus-cyan/40 pointer-events-none z-10 hidden sm:block"
      ></motion.div>
      <motion.div 
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="absolute bottom-6 left-6 w-16 h-16 border-b-[1.5px] border-l-[1.5px] border-animus-cyan/40 pointer-events-none z-10 hidden sm:block"
      ></motion.div>
      <motion.div 
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="absolute bottom-6 right-6 w-16 h-16 border-b-[1.5px] border-r-[1.5px] border-animus-cyan/40 pointer-events-none z-10 hidden sm:block"
      ></motion.div>

      {/* Code Console Pattern */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <BackgroundConsole />
      </motion.div>
      
      {/* Background Abstergo Logo - Placed behind the top-right console, glitching & visible */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.8, delay: 1.0 }}
        className="absolute top-10 right-6 md:top-14 md:right-10 pointer-events-none select-none z-[1]"
      >
        <div className="flex flex-col items-center gap-1 opacity-[0.20] dark:opacity-[0.14] hover:opacity-[0.35] transition-opacity duration-500">
          <AbstergoLogo disableSpin className="w-16 h-16 md:w-20 md:h-20 text-animus-cyan/60 dark:text-animus-cyan/40 glitch-svg animate-pulse" />
          <span className="font-mono text-[7px] tracking-[0.3em] text-animus-cyan/40 dark:text-animus-cyan/30 uppercase">ABSTERGO.SYS_C10</span>
        </div>
      </motion.div>

      {/* Disguised Toggles - Top Left */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="absolute top-8 left-8 z-20 flex flex-col gap-2"
      >
        <div 
          className="text-animus-cyan/60 font-mono text-[10px] sm:text-xs cursor-pointer hover:text-animus-cyan hover:drop-shadow-[0_0_5px_rgba(0,255,255,0.8)] transition-all"
          onClick={toggleTheme}
          title="Toggle Visual Theme"
        >
          [ SYS.THEME: {currentTheme?.toUpperCase()} ]
        </div>
        
        <div 
          className="text-animus-cyan/60 font-mono text-[10px] sm:text-xs cursor-pointer hover:text-animus-cyan hover:drop-shadow-[0_0_5px_rgba(0,255,255,0.8)] transition-all"
          onClick={toggleLanguage}
          title="Toggle Language"
        >
          [ SYS.LANG: {language.toUpperCase()} ]
        </div>
      </motion.div>

      {/* Main Scene Container */}
      <div className="scene relative z-10 flex flex-col items-center select-none mt-12 md:mt-16">
        <motion.div
          initial={{ opacity: 0, y: -30, scale: 0.9, rotate: -5 }}
          animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
          transition={{ duration: 1.2, delay: 1.5, ease: [0.1, 0.8, 0.2, 1] }}
        >
          <HugeAnimusLogo onSyncComplete={handleEnter} />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 2.1, ease: [0.1, 0.8, 0.2, 1] }}
          className="banner-wrap w-[300px] sm:w-[480px] md:w-[540px] mt-[-14px] relative cursor-pointer hover:scale-[1.03] transition-transform duration-300"
          onClick={(e) => { e.stopPropagation(); handleEnter(); }}
        >
          {/* Animated Particles around Button */}
          <div className="absolute -inset-4 z-[-1] pointer-events-none opacity-50 flex items-center justify-center overflow-hidden">
            <div className="w-[120%] h-[120%] bg-[radial-gradient(ellipse_at_center,rgba(0,240,224,0.15)_0%,transparent_60%)] animate-pulse shadow-[0_0_20px_rgba(0,240,224,0.3)]"></div>
          </div>
          
          <div className="banner-box banner-scan relative overflow-hidden text-center border-t-0 p-4 sm:p-5 md:p-6 bg-[radial-gradient(ellipse_at_center,#0b2d35_0%,#031215_100%)] dark:bg-[radial-gradient(ellipse_at_center,#021014_0%,#000506_100%)] border-[1.5px] border-animus-cyan shadow-[0_0_15px_rgba(0,153,153,0.45),inset_0_0_20px_rgba(0,0,0,0.85)] dark:shadow-[0_0_15px_rgba(0,240,224,0.55),inset_0_0_20px_rgba(0,0,0,0.95)] transition-colors duration-300">
            {/* Attention-Commanding Pulsing Halo Ripple */}
            <div className="absolute inset-0 rounded-none border border-animus-cyan border-dashed animate-pulse opacity-40 z-0 pointer-events-none"></div>

            {/* Animated background lines for button */}
            <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(255,255,255,0.05)_50%)] dark:bg-[linear-gradient(transparent_50%,rgba(0,240,224,0.05)_50%)] bg-[length:100%_4px] animate-[scan_2s_linear_infinite] z-0 pointer-events-none"></div>

            <div className="bracket tl absolute top-[6px] left-[6px] w-4 h-4 border-t-2 border-l-2 border-white dark:border-animus-cyan"></div>
            <div className="bracket tr absolute top-[6px] right-[6px] w-4 h-4 border-t-2 border-r-2 border-white dark:border-animus-cyan"></div>
            <div className="bracket bl absolute bottom-[6px] left-[6px] w-4 h-4 border-b-2 border-l-2 border-white dark:border-animus-cyan"></div>
            <div className="bracket br absolute bottom-[6px] right-[6px] w-4 h-4 border-b-2 border-r-2 border-white dark:border-animus-cyan"></div>
            
            <div 
              className="banner-text font-mokoto font-bold text-white dark:text-animus-cyan-bright text-lg sm:text-2xl md:text-3xl tracking-[0.15em] sm:tracking-[0.25em] md:tracking-[0.3em] relative z-10 glitch-text whitespace-nowrap [text-shadow:0_0_8px_rgba(255,255,255,0.4)] [-webkit-text-stroke:0.5px_rgba(255,255,255,0.2)] dark:[text-shadow:0_0_10px_#00f0e0,0_0_28px_rgba(0,240,224,0.2)] dark:[-webkit-text-stroke:0.5px_rgba(0,240,224,0.4)]"
              data-text={t('splash.welcome') || 'WELCOME ANALYST'}
            >
              {t('splash.welcome') || 'WELCOME ANALYST'}
            </div>
            
            {/* Scanning line across button text */}
            <div className="absolute inset-y-0 -left-full w-full bg-[linear-gradient(90deg,transparent,rgba(0,240,224,0.4),transparent)] animate-[glitch-anim_4s_infinite] z-10 pointer-events-none"></div>
          </div>
          
          <div className="version-line mt-3 font-mono text-[0.6rem] md:text-sm tracking-[0.2em] text-animus-cyan/60 uppercase text-center animate-pulse">
            Hospitallier Antivirus &nbsp;v4.0.7004&hellip;
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

