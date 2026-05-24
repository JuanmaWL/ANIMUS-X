import { NavLink } from 'react-router-dom';
import { Home, Database, Map, HelpCircle, UserCheck, Newspaper } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAppSound, SOUND_ASSETS } from '../../hooks/useAppSound';
import { useI18n } from '../../contexts/I18nContext';
import { cn } from '../../utils/cn';
import { APP_CONFIG } from '../../config';

export function NavBar({ className }: { className?: string }) {
  const [playClick] = useAppSound(SOUND_ASSETS.UI.TAB_CHANGE);
  const { t } = useI18n();

  const allNavItems = [
    { to: '/', icon: Home, label: t('nav.home'), id: 'home' },
    { to: '/memory', icon: Database, label: t('nav.memory'), id: 'memory' },
    { to: '/tracker', icon: Map, label: t('nav.tracker'), id: 'tracker' },
    { to: '/trivia', icon: HelpCircle, label: t('nav.trivia'), id: 'trivia' },
    { to: '/guesswho', icon: UserCheck, label: t('nav.guesswho'), id: 'guesswho' },
    { to: '/feed', icon: Newspaper, label: t('nav.feed'), id: 'feed' },
  ];

  const navItems = allNavItems.filter(item => {
    if (item.id === 'home') return true;
    return APP_CONFIG.features[item.id as keyof typeof APP_CONFIG.features];
  });

  return (
    <nav className={cn(
      "fixed bottom-0 left-0 w-full z-40 bg-animus-bg/90 dark:bg-animus-bg-dark/90 backdrop-blur-md border-t border-animus-border/30 dark:border-animus-border-dark/30",
      "pb-safe", // for iOS safe area if needed
      className
    )}>
      <div className="flex items-center justify-around px-2 py-3 max-w-md mx-auto relative">
        {/* Línea decorativa superior cian */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-animus-cyan to-transparent opacity-50 block" />
        
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            onClick={() => playClick()}
            className={({ isActive }) => cn(
              "flex flex-col items-center justify-center w-14 h-12 relative transition-colors duration-200 group",
              isActive 
                ? "text-animus-cyan" 
                : "text-animus-text-muted hover:text-animus-cyan/70 dark:text-animus-text-dark/50 dark:hover:text-animus-cyan/70"
            )}
          >
            {({ isActive }) => (
              <>
                <div className="relative z-10 flex flex-col items-center">
                  <item.icon size={22} className={cn("mb-1 transition-all duration-300", isActive && "drop-shadow-[0_0_8px_rgba(0,207,207,0.8)] scale-110")} />
                  <span className="text-[9px] font-display uppercase tracking-wider hidden sm:block truncate w-full text-center">
                    {item.label}
                  </span>
                </div>
                
                {/* Active indicator dot / highlight */}
                {isActive && (
                  <motion.div
                    layoutId="active-nav-indicator"
                    className="absolute inset-0 flex items-end justify-center pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  >
                    {/* PC Mode Glow/Highlight (Hidden on Mobile) */}
                    <div className="hidden sm:block absolute inset-0 bg-animus-cyan/10 rounded-t-lg border-b-2 border-animus-cyan" />
                    
                    {/* Mobile Rombo (Hidden on PC) */}
                    <div className="sm:hidden absolute bottom-0 w-1.5 h-1.5 bg-animus-red rotate-45 shadow-[0_0_8px_rgba(255,0,0,0.8)]" />
                  </motion.div>
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
