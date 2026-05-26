import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'es' | 'en' | 'fr';

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const enDict: Record<string, string> = {
  'nav.home': 'Hub',
  'nav.memory': 'Memories',
  'nav.tracker': 'Tracker',
  'nav.trivia': 'Subjects',
  'nav.guesswho': 'Guess Who',
  'nav.feed': 'News',
  'dashboard.menu': 'Animus Hub',
  'dashboard.comms': 'Security Network',
  'dashboard.memory.label': 'GENETIC MEMORIES',
  'dashboard.memory.desc': 'Video archives and info',
  'dashboard.tracker.label': 'WHERE IS THE ASSASSIN',
  'dashboard.tracker.desc': 'Subject tracker (Minigame)',
  'dashboard.trivia.label': 'SUBJECTS ARCHIVE',
  'dashboard.trivia.desc': 'Multiple identification',
  'dashboard.guesswho.label': 'GUESS WHO',
  'dashboard.guesswho.desc': 'Photographic verification',
  'dashboard.feed.label': 'NEWS TERMINAL',
  'dashboard.feed.desc': 'Current order events',
  'splash.welcome': 'WELCOME, ANALYST',
  'settings.title': 'System Config',
  'settings.audio': 'Audio',
  'settings.audio.on': 'ON',
  'settings.audio.off': 'OFF',
  'settings.visuals': 'Theme',
  'settings.visuals.sys': 'Sys',
  'settings.lang': 'Lang',
  'theme.light': 'Light',
  'theme.dark': 'Dark',
  'about.title': 'About Animus X',
  'about.desc': 'Created by Juasmo. Identity & lore by Ubicypher.',
  'wip.module.req': '[MODULE REQUIRED] Processing images... (WORK IN PROGRESS)',
  'wip.system.wait': '[SYSTEM STANDBY] Gathering locations... (WORK IN PROGRESS)',
  'wip.access.denied': '[ACCESS DENIED] Historical profile loading pending... (WORK IN PROGRESS)',
  'wip.signal.lost': '[SIGNAL LOST] Sequence archive corrupted or unavailable... (WORK IN PROGRESS)',
  'feed.featured': 'Featured Data_',
  'feed.decrypt': 'Decrypt Link',
};

export const esDict: Record<string, string> = {
  'nav.home': 'Nexo',
  'nav.memory': 'Recuerdos',
  'nav.tracker': 'Rastreador',
  'nav.trivia': 'Sujetos',
  'nav.guesswho': 'Incógnito',
  'nav.feed': 'Intel',
  'dashboard.menu': 'Nexo Animus',
  'dashboard.comms': 'Red de Seguridad',
  'dashboard.memory.label': 'RECUERDOS GENÉTICOS',
  'dashboard.memory.desc': 'Archivos visuales y datos',
  'dashboard.tracker.label': 'RASTREADOR DE OBJETIVOS',
  'dashboard.tracker.desc': 'Localización (Minijuego)',
  'dashboard.trivia.label': 'ARCHIVO DE SUJETOS',
  'dashboard.trivia.desc': 'Identificación múltiple',
  'dashboard.guesswho.label': 'OBJETIVO INCÓGNITO',
  'dashboard.guesswho.desc': 'Verificación fotográfica',
  'dashboard.feed.label': 'TERMINAL DE INTEL',
  'dashboard.feed.desc': 'Actualidad de la Orden',
  'splash.welcome': 'BIENVENIDO, ANALISTA',
  'settings.title': 'Config. de Sistema',
  'settings.audio': 'Audio',
  'settings.audio.on': 'ON',
  'settings.audio.off': 'OFF',
  'settings.visuals': 'Tema',
  'settings.visuals.sys': 'Sis',
  'settings.lang': 'Idioma',
  'theme.light': 'Claro',
  'theme.dark': 'Oscuro',
  'about.title': 'Acerca de Animus X',
  'about.desc': 'Creado por Juasmo. Identidad visual y lore por Ubicypher.',
  'wip.module.req': '[MÓDULO REQUERIDO] Procesando imágenes... (WORK IN PROGRESS)',
  'wip.system.wait': '[SISTEMA EN ESPERA] Recopilando ubicaciones... (WORK IN PROGRESS)',
  'wip.access.denied': '[ACCESO DENEGADO] Carga de perfiles históricos pendiente... (WORK IN PROGRESS)',
  'wip.signal.lost': '[SEÑAL NO ENCONTRADA] Archivo de secuencias dañado o no disponible... (WORK IN PROGRESS)',
  'feed.featured': 'Datos Destacados_',
  'feed.decrypt': 'Desencriptar Enlace',
};

export const frDict: Record<string, string> = {
  'nav.home': 'Hub',
  'nav.memory': 'Mémoires',
  'nav.tracker': 'Traqueur',
  'nav.trivia': 'Sujets',
  'nav.guesswho': 'Inconnu',
  'nav.feed': 'Réseau',
  'dashboard.menu': 'Hub Animus',
  'dashboard.comms': 'Réseau de Sécurité',
  'dashboard.memory.label': 'MÉMOIRES GÉNÉTIQUES',
  'dashboard.memory.desc': 'Archives vidéo et info',
  'dashboard.tracker.label': 'TRAQUEUR DE CIBLES',
  'dashboard.tracker.desc': 'Localisation (Minijeu)',
  'dashboard.trivia.label': 'ARCHIVES DE SUJETS',
  'dashboard.trivia.desc': 'Identification multiple',
  'dashboard.guesswho.label': 'CIBLE INCONNUE',
  'dashboard.guesswho.desc': 'Vérification photographique',
  'dashboard.feed.label': 'TERMINAL RÉSEAU',
  'dashboard.feed.desc': 'Événements actuels',
  'splash.welcome': 'BIENVENUE, ANALYSTE',
  'settings.title': 'Config. Système',
  'settings.audio': 'Audio',
  'settings.audio.on': 'ON',
  'settings.audio.off': 'OFF',
  'settings.visuals': 'Thème',
  'settings.visuals.sys': 'Sys',
  'settings.lang': 'Langue',
  'theme.light': 'Clair',
  'theme.dark': 'Sombre',
  'about.title': 'À propos d\'Animus X',
  'about.desc': 'Créé par Juasmo. Identité visuelle et lore par Ubicypher.',
  'wip.module.req': '[MODULE REQUIS] Traitement des images... (WORK IN PROGRESS)',
  'wip.system.wait': '[ATTENTE SYSTÈME] Collecte des emplacements... (WORK IN PROGRESS)',
  'wip.access.denied': '[ACCÈS REFUSÉ] Chargement des profils historiques en attente... (WORK IN PROGRESS)',
  'wip.signal.lost': '[SIGNAL PERDU] Archive de séquence corrompue ou indisponible... (WORK IN PROGRESS)',
  'feed.featured': 'Données en Vedette_',
  'feed.decrypt': 'Déchiffrer le Lien',
};

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('es');

  useEffect(() => {
    const saved = localStorage.getItem('animusx_lang') as Language;
    if (saved && ['es', 'en', 'fr'].includes(saved)) {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('animusx_lang', lang);
  };

  const t = (key: string) => {
    const dict = language === 'en' ? enDict : language === 'fr' ? frDict : esDict;
    return dict[key] || key; // fallback to key
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used inside I18nProvider');
  return ctx;
}
