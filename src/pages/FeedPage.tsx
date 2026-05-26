import React from 'react';
import { HudFrame } from '../components/hud/HudFrame';
import { GlitchText } from '../components/hud/GlitchText';
import { MOCK_NEWS } from '../lib/mockData';
import { ExternalLink, Calendar, BookOpen, Newspaper } from 'lucide-react';
import { useI18n } from '../contexts/I18nContext';
import { cn } from '../utils/cn';

export default function FeedPage() {
  const { t } = useI18n();
  const featuredNews = MOCK_NEWS.find(n => n.is_featured) || MOCK_NEWS[0];
  const restNews = MOCK_NEWS.filter(n => n.id !== featuredNews.id);

  return (
    <div className="w-full flex flex-col gap-6 p-4">
      <div className="flex items-center gap-3">
        <Newspaper className="w-8 h-8 text-animus-cyan" />
        <h1 className="font-orbitron text-2xl md:text-3xl text-animus-red font-black tracking-widest uppercase">
          <GlitchText>{t('dashboard.feed.label')}</GlitchText>
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Destacado */}
        <div className="md:col-span-2">
          <HudFrame className="w-full h-full p-0 overflow-hidden flex flex-col">
            <div className="relative w-full h-48 sm:h-64 overflow-hidden group">
              <img 
                src={featuredNews.thumbnail_url} 
                alt={featuredNews.title} 
                className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
              />
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-animus-bg-dark/90 via-animus-bg-dark/50 to-transparent" />
              <div className="absolute top-4 left-4 border border-animus-cyan bg-animus-cyan/20 backdrop-blur-md px-3 py-1 font-mono text-xs text-animus-cyan uppercase tracking-widest shadow-[0_0_10px_rgba(0,207,207,0.5)]">
                {t('feed.featured')}
              </div>
            </div>
            
            <div className="p-6 flex-1 flex flex-col justify-between z-10 bg-animus-bg/10 backdrop-blur-sm -mt-20">
              <div>
                <a href={featuredNews.url} target="_blank" rel="noopener noreferrer" className="group shrink-0 inline-block">
                  <h2 className="font-orbitron font-medium text-xl sm:text-3xl text-animus-text dark:text-animus-text-dark leading-tight group-hover:text-animus-cyan transition-colors mb-2">
                    {featuredNews.title}
                  </h2>
                </a>
                <p className="font-mono text-sm text-animus-text-muted dark:text-animus-text-dark/70 mb-4 line-clamp-3">
                  {featuredNews.excerpt}
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-animus-border/30 dark:border-animus-border-dark/30 pt-4 mt-4">
                <div className="flex items-center gap-4 text-xs font-mono text-animus-cyan">
                  <span className="flex items-center gap-1.5"><Calendar size={14} /> {featuredNews.published_at}</span>
                  <span className="flex items-center gap-1.5"><BookOpen size={14} /> {featuredNews.source}</span>
                </div>
                <a 
                  href={featuredNews.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-animus-red/10 border border-animus-red text-animus-red font-mono text-xs hover:bg-animus-red hover:text-white transition-colors uppercase tracking-widest flex items-center gap-2"
                >
                  {t('feed.decrypt')} <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </HudFrame>
        </div>

        {/* Lista secundaria */}
        <div className="md:col-span-1 flex flex-col gap-4">
          {restNews.map((news) => (
            <HudFrame key={news.id} className="w-full p-4 flex flex-col sm:flex-row md:flex-col gap-4 hover:shadow-[0_0_15px_rgba(138,191,196,0.15)] transition-shadow">
              <div className="w-full sm:w-1/3 md:w-full h-32 md:h-40 overflow-hidden relative border border-animus-border/30 dark:border-animus-border-dark/30 shrink-0">
                <img 
                  src={news.thumbnail_url} 
                  alt={news.title}
                  className="w-full h-full object-cover grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300" 
                />
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <a href={news.url} target="_blank" rel="noopener noreferrer" className="group mb-2">
                  <h3 className="font-orbitron font-medium text-animus-text dark:text-animus-text-dark leading-tight text-sm sm:text-base group-hover:text-animus-cyan transition-colors line-clamp-2">
                    {news.title}
                  </h3>
                </a>
                <div className="flex items-center justify-between text-[10px] font-mono text-animus-text-muted mt-2 border-t border-dashed border-animus-border/30 pt-2">
                  <span className="text-animus-gold uppercase">{news.source}</span>
                  <span>{news.published_at}</span>
                </div>
              </div>
            </HudFrame>
          ))}
        </div>
      </div>
    </div>
  );
}
