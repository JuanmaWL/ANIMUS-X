import { useState, useRef, useEffect } from 'react';
import { Settings, X, Volume2, VolumeX, Sun, Moon, Globe } from 'lucide-react';
import { useAudio } from '../../contexts/AudioContext';
import { useTheme } from 'next-themes';
import { useI18n } from '../../contexts/I18nContext';
import { useAppSound, SOUND_ASSETS } from '../../hooks/useAppSound';
import { cn } from '../../utils/cn';

export function SettingsMenu({ className }: { className?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  
  const { muted, setMuted } = useAudio();
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, t } = useI18n();
  const [playOpenMenu] = useAppSound(SOUND_ASSETS.UI.OPEN_MENU);
  const [playCloseMenu] = useAppSound(SOUND_ASSETS.UI.CLOSE_MENU);
  const [playClick] = useAppSound(SOUND_ASSETS.UI.CLICK);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleLanguage = () => {
    if (language === 'es') setLanguage('en');
    else if (language === 'en') setLanguage('fr');
    else setLanguage('es');
  };

  const handleToggle = () => {
    isOpen ? playCloseMenu() : playOpenMenu();
    setIsOpen(!isOpen);
  };

  const langDisplay: Record<string, { label: string, img: string }> = {
    es: { label: 'ES', img: 'https://flagcdn.com/w20/es.png' },
    en: { label: 'EN', img: 'https://flagcdn.com/w20/gb.png' },
    fr: { label: 'FR', img: 'https://flagcdn.com/w20/fr.png' }
  };

  const getThemeText = () => {
    if (theme === 'system') return t('settings.visuals.sys');
    return theme === 'dark' ? t('theme.dark') : t('theme.light');
  };

  return (
    <div className={cn("relative", className)} ref={menuRef}>
      <button
        onClick={handleToggle}
        className="p-2 text-animus-cyan hover:bg-animus-cyan/10 transition-colors rounded-sm"
        title="Settings"
      >
        {isOpen ? <X size={24} /> : <Settings size={24} className="hover:rotate-90 transition-transform duration-500" />}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-64 bg-animus-bg/95 dark:bg-animus-bg-dark/95 border-2 border-animus-cyan/50 backdrop-blur-md shadow-[0_0_15px_rgba(0,207,207,0.3)] z-50 p-4">
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-animus-cyan" />
          <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-animus-cyan" />
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-animus-cyan" />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-animus-cyan" />
          
          <h3 className="font-display text-sm tracking-widest text-animus-red uppercase mb-4 text-center border-b border-animus-red/30 pb-2">
            {t('settings.title')}
          </h3>
          
          <div className="flex flex-col gap-3 font-mono text-sm">
            {/* Audio Toggle */}
            <button 
              onClick={() => { playClick(); setMuted(!muted); }}
              className="flex items-center justify-between p-2 hover:bg-animus-cyan/10 text-animus-text dark:text-animus-text-dark transition-colors border border-transparent hover:border-animus-cyan/30"
            >
              <div className="flex items-center gap-2">
                {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                <span>{t('settings.audio')}</span>
              </div>
              <span className={cn("text-xs font-bold", muted ? "text-animus-red" : "text-animus-cyan")}>
                {muted ? t('settings.audio.off') : t('settings.audio.on')}
              </span>
            </button>

            {/* Theme Toggle */}
            <button 
              onClick={() => { playClick(); setTheme(theme === 'dark' ? 'light' : 'dark'); }}
              className="flex items-center justify-between p-2 hover:bg-animus-cyan/10 text-animus-text dark:text-animus-text-dark transition-colors border border-transparent hover:border-animus-cyan/30"
            >
              <div className="flex items-center gap-2">
                {theme === 'dark' ? <Moon size={16} /> : <Sun size={16} />}
                <span>{t('settings.visuals')}</span>
              </div>
              <span className="text-xs font-bold text-animus-cyan uppercase">
                {getThemeText()}
              </span>
            </button>

            {/* Language Toggle */}
            <button 
              onClick={() => { playClick(); toggleLanguage(); }}
              className="flex items-center justify-between p-2 hover:bg-animus-cyan/10 text-animus-text dark:text-animus-text-dark transition-colors border border-transparent hover:border-animus-cyan/30"
            >
              <div className="flex items-center gap-2">
                <Globe size={16} />
                <span>{t('settings.lang')}</span>
              </div>
              <div className="flex items-center gap-1.5 px-1">
                <img src={langDisplay[language].img} alt={language} className="w-4 h-3 rounded-[2px] opacity-80" />
                <span className="text-xs font-bold text-animus-gold uppercase">
                  {langDisplay[language].label}
                </span>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
