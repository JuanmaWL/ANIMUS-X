export const SOUND_ASSETS = {
  UI: {
    CLICK: '/sounds/ui/click.mp3',
    HOVER: '/sounds/ui/hover.mp3',
    TAB_CHANGE: '/sounds/ui/tab_change.mp3',
    OPEN_MENU: '/sounds/ui/open_menu.mp3',
    CLOSE_MENU: '/sounds/ui/close_menu.mp3'
  },
  ANIMUS: {
    BOOT: '/sounds/animus/boot.mp3',
    GLITCH: '/sounds/animus/glitch.mp3',
    SYNC: '/sounds/animus/sync.mp3'
  }
} as const;

export type SoundCategory = keyof typeof SOUND_ASSETS;

// A flat type for type safety when passing sound paths
export type SoundPath = 
  | typeof SOUND_ASSETS.UI[keyof typeof SOUND_ASSETS.UI]
  | typeof SOUND_ASSETS.ANIMUS[keyof typeof SOUND_ASSETS.ANIMUS];
