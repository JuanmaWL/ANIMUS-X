import React from 'react';
import { HudFrame } from '../components/hud/HudFrame';
import { GlitchText } from '../components/hud/GlitchText';
import { useI18n } from '../contexts/I18nContext';

export default function MemoryPage() {
  const { t } = useI18n();

  return (
    <div className="w-full p-4">
      <HudFrame>
        <h1 className="font-orbitron text-xl text-animus-red font-black tracking-widest mb-4 uppercase">
          <GlitchText>{t('dashboard.memory.label')}</GlitchText>
        </h1>
        <p className="font-mono text-animus-text dark:text-animus-text-dark">
          {t('wip.signal.lost')}
        </p>
      </HudFrame>
    </div>
  );
}
