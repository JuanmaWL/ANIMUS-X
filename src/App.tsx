/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from 'next-themes';
import { AnimatePresence, motion } from 'framer-motion';
import { AudioProvider } from './contexts/AudioContext';
import { I18nProvider } from './contexts/I18nContext';
import { SettingsMenu } from './components/layout/SettingsMenu';
import { ChatBotFAB } from './components/layout/ChatBotFAB';
import { NavBar } from './components/layout/NavBar';
import { AnimusLogo } from './components/hud/AnimusLogo';
import { SplashScreen } from './components/hud/SplashScreen';

// Pages
import Dashboard from './pages/Dashboard';
import MemoryPage from './pages/MemoryPage';
import TrackerPage from './pages/TrackerPage';
import TriviaPage from './pages/TriviaPage';
import GuessWhoPage from './pages/GuessWhoPage';
import FeedPage from './pages/FeedPage';

function AppLayout() {
  const [showSplash, setShowSplash] = useState(true);
  const location = useLocation();

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden flex flex-col bg-animus-bg dark:bg-animus-bg-dark bg-[image:var(--background-image-hex-pattern)] bg-[position:center_center] bg-repeat bg-fixed transition-colors duration-300">
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}

      {/* Decoración química de fondo */}
      <div className="fixed top-1/4 -right-10 md:right-10 text-animus-cyan/5 dark:text-animus-cyan/10 font-mono text-xs pointer-events-none select-none z-0">
        <pre>
          C10H14N2{'\n'}
          H3C-N(CH3)2{'\n'}
          |{'\n'}
          C-C-NH2
        </pre>
      </div>

      {/* Header Global */}
      <header className="sticky top-0 left-0 w-full z-50 bg-animus-bg/90 dark:bg-animus-bg-dark/90 backdrop-blur-md border-b border-animus-border/30 dark:border-animus-border-dark/30 shadow-md">
        
        {/* Línea decorativa inferior cian */}
        <div className="absolute bottom-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-transparent via-animus-cyan to-transparent opacity-60 shadow-[0_0_8px_rgba(0,207,207,0.8)]" />

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Scanning line effect */}
          <div className="absolute inset-x-0 h-[1.5px] bg-animus-cyan/40 opacity-50 animate-[scan_3s_linear_infinite] shadow-[0_0_8px_rgba(0,153,153,0.8)] z-0" />
          
          {/* HUD grid noise overlay */}
          <div className="absolute inset-0 bg-[length:20px_20px] bg-[image:var(--background-image-dot-grid)] opacity-[0.15] dark:opacity-30 z-0 mix-blend-overlay" />
          
          {/* Decorative HUD corners */}
          <div className="absolute top-0 left-0 w-12 h-3.5 border-t-2 border-l-2 border-animus-cyan/50 dark:border-animus-cyan/70 z-0 transition-all duration-1000 origin-top-left hover:scale-110" />
          <div className="absolute bottom-0 right-0 w-12 h-3.5 border-b-2 border-r-2 border-animus-cyan/50 dark:border-animus-cyan/70 z-0 transition-all duration-1000 origin-bottom-right hover:scale-110" />
        </div>

        <div className="relative max-w-4xl mx-auto w-full flex justify-between items-center py-2 px-6 sm:py-3 sm:px-10 z-10">
          <div className="flex items-center gap-3">
            <div className="relative group ml-1 sm:ml-2">
              <AnimusLogo className="w-12 h-12 md:w-16 md:h-16 drop-shadow-[0_0_8px_rgba(0,207,207,0.3)] group-hover:drop-shadow-[0_0_15px_rgba(0,207,207,0.5)] transition-all duration-500" />
            </div>
          </div>

          {/* Tech Data lines (centered decoration) */}
          <div className="hidden sm:flex flex-col items-center justify-center pointer-events-none opacity-80">
            <div className="flex items-center gap-3 text-animus-text-muted dark:text-animus-text-dark/60 text-[10px] font-mono tracking-widest uppercase">
              <div className="flex items-center gap-1.5">
                <span className="animate-pulse w-1.5 h-1.5 bg-animus-red rounded-sm border border-black/10 dark:border-white/10" />
                <span>SYNC RATE: 99.8%</span>
              </div>
              <span className="text-animus-cyan/40">|</span>
              <span>BDS: SECURE</span>
              <span className="text-animus-cyan/40">|</span>
              <span className="text-animus-cyan shadow-[0_0_8px_rgba(0,207,207,0.4)]">V2.4_SYS</span>
            </div>
            <div className="h-[1px] w-56 bg-gradient-to-r from-transparent via-animus-cyan/40 flex m-auto mt-1 to-transparent" />
          </div>

          <div className="flex items-center gap-3 md:gap-5">
            <div className="hidden md:flex flex-col items-end text-[9px] font-mono text-animus-text/50 dark:text-animus-cyan/60 tracking-widest uppercase pointer-events-none border-r border-animus-cyan/20 pr-4">
              <span>S_ID: {Math.random().toString(36).substring(2, 8).toUpperCase()}</span>
              <span>UPLINK ESTABLISHED</span>
            </div>
            <SettingsMenu />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col pt-6 pb-20 z-10 w-full max-w-4xl mx-auto items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, filter: 'brightness(1.5) contrast(1.5) blur(10px) drop-shadow(0 0 10px rgba(0, 207, 207, 0.5))', x: -10, skewX: -5 }}
            animate={{ opacity: 1, filter: 'brightness(1) contrast(1) blur(0px) drop-shadow(0 0 0px rgba(0, 207, 207, 0))', x: 0, skewX: 0 }}
            exit={{ opacity: 0, filter: 'brightness(1.5) contrast(2) blur(10px) drop-shadow(0 0 10px rgba(255, 0, 0, 0.5))', x: 10, skewX: 5 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="w-full flex-1 flex flex-col"
          >
            <Routes location={location}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/memory" element={<MemoryPage />} />
              <Route path="/tracker" element={<TrackerPage />} />
              <Route path="/trivia" element={<TriviaPage />} />
              <Route path="/guesswho" element={<GuessWhoPage />} />
              <Route path="/feed" element={<FeedPage />} />
            </Routes>
          </motion.div>
        </AnimatePresence>

        {/* Easter Egg / Info about authors */}
        <div className="mt-8 text-center text-[8px] sm:text-[9px] font-mono tracking-widest text-animus-cyan/30 opacity-20 hover:opacity-100 transition-opacity duration-1000 cursor-default select-none group pb-2">
          <p className="invisible group-hover:visible mb-1 transition-all">SYS.AUTH: OK</p>
          <p>DEV_BY:// JUASMO</p>
          <p>LORE_VISUALS_BY:// <span className="text-animus-gold/70 group-hover:text-animus-gold transition-colors">UBICYPHER</span></p>
        </div>
      </main>

      <ChatBotFAB className="bottom-20" />
      <NavBar />
    </div>
  );
}

export default function App() {
  return (
    // @ts-expect-error React 19 type mismatch for next-themes
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <I18nProvider>
        <AudioProvider>
          <BrowserRouter>
            <AppLayout />
          </BrowserRouter>
        </AudioProvider>
      </I18nProvider>
    </ThemeProvider>
  );
}
