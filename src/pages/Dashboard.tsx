import React from 'react';
import { HudFrame } from '../components/hud/HudFrame';
import { GlitchText } from '../components/hud/GlitchText';
import { HudDots } from '../components/hud/HudDots';
import { TwitterFeed } from '../components/sections/TwitterFeed';
import { Database, Map, HelpCircle, UserCheck, Newspaper } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useI18n } from '../contexts/I18nContext';
import { APP_CONFIG } from '../config';

export default function Dashboard() {
  const { t } = useI18n();

  const allSections = [
    { to: '/memory', icon: Database, label: t('dashboard.memory.label'), desc: t('dashboard.memory.desc'), id: 'memory' },
    { to: '/tracker', icon: Map, label: t('dashboard.tracker.label'), desc: t('dashboard.tracker.desc'), id: 'tracker' },
    { to: '/trivia', icon: HelpCircle, label: t('dashboard.trivia.label'), desc: t('dashboard.trivia.desc'), id: 'trivia' },
    { to: '/guesswho', icon: UserCheck, label: t('dashboard.guesswho.label'), desc: t('dashboard.guesswho.desc'), id: 'guesswho' },
    { to: '/feed', icon: Newspaper, label: t('dashboard.feed.label'), desc: t('dashboard.feed.desc'), id: 'feed' },
  ];

  const SECTIONS = allSections.filter(sec => 
    APP_CONFIG.features[sec.id as keyof typeof APP_CONFIG.features]
  );

  return (
    <div className="w-full flex md:flex-row flex-col gap-6 p-4">
      <div className="flex-1 flex flex-col gap-6">
        <HudFrame className="w-full">
          <h1 className="font-orbitron text-xl text-animus-red font-black tracking-widest mb-2 uppercase">
            <GlitchText>{t('dashboard.menu')}</GlitchText>
          </h1>
          <HudDots count={8} className="w-full mb-4 opacity-50" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {SECTIONS.map((sec) => (
              <Link 
                key={sec.to} 
                to={sec.to}
                className="glitch-effect flex items-center gap-4 p-4 border border-animus-border/30 dark:border-animus-border-dark/30 bg-animus-cyan/5 hover:bg-animus-cyan/20 transition-colors group relative"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-animus-cyan group-hover:w-full group-hover:opacity-10 transition-all" />
                <sec.icon className="w-8 h-8 text-animus-gold group-hover:text-animus-cyan transition-colors" />
                <div>
                  <h3 className="font-orbitron font-medium text-animus-text dark:text-animus-text-dark text-sm sm:text-base leading-tight">{sec.label}</h3>
                  <p className="font-mono text-xs text-animus-text-muted dark:text-animus-text-dark/50 mt-1">{sec.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </HudFrame>
      </div>
      
      <div className="flex-1 w-full mx-auto md:mx-0 min-w-0">
        <HudFrame className="w-full h-full flex flex-col overflow-hidden">
          <h2 className="font-orbitron text-sm text-animus-red font-bold tracking-widest mb-2 uppercase">
            {t('dashboard.comms')}: @{APP_CONFIG.social.twitterHandle}
          </h2>
          <div className="flex-1 overflow-y-auto max-h-[600px] min-h-[400px]">
            <TwitterFeed handle={APP_CONFIG.social.twitterHandle} />
          </div>
        </HudFrame>
      </div>
    </div>
  );
}
