import { NavLink } from 'react-router-dom';
import { Home, Database, Map, HelpCircle, UserCheck, Newspaper } from 'lucide-react';
import { useAppSound } from '../../hooks/useAppSound';
import { useI18n } from '../../contexts/I18nContext';
import { cn } from '../../utils/cn';
import { APP_CONFIG } from '../../config';

export function NavBar({ className }: { className?: string }) {
  const [playClick] = useAppSound('/sounds/ui/click.mp3');
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
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-animus-cyan to-transparent opacity-50" />
        
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            onClick={() => playClick()}
            className={({ isActive }) => cn(
              "flex flex-col items-center justify-center w-14 h-12 relative transition-colors duration-200",
              isActive 
                ? "text-animus-cyan" 
                : "text-animus-text-muted hover:text-animus-cyan/70 dark:text-animus-text-dark/50 dark:hover:text-animus-cyan/70"
            )}
          >
            {({ isActive }) => (
              <>
                <item.icon size={22} className={cn("mb-1", isActive && "drop-shadow-[0_0_8px_rgba(0,207,207,0.8)]")} />
                <span className="text-[9px] font-display uppercase tracking-wider hidden sm:block truncate w-full text-center">
                  {item.label}
                </span>
                
                {/* Active indicator dot */}
                {isActive && (
                  <div className="absolute bottom-0 w-1.5 h-1.5 bg-animus-red rotate-45 sm:hidden" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
