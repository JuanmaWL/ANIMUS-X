import React from 'react';
import { HudFrame } from '../components/hud/HudFrame';
import { GlitchText } from '../components/hud/GlitchText';
import { useI18n } from '../contexts/I18nContext';

export default function TrackerPage() {
  const { t } = useI18n();

  return (
    <div className="w-full p-4">
      <HudFrame>
        <h1 className="font-display text-xl text-animus-red font-black tracking-widest mb-4 uppercase">
          <GlitchText>{t('dashboard.tracker.label')}</GlitchText>
        </h1>
        <p className="font-mono text-animus-text dark:text-animus-text-dark">
          {t('wip.system.wait')}
        </p>
      </HudFrame>
    </div>
  );
}
