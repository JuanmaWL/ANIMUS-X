import React, { createContext, useContext, useState, useEffect } from 'react';

interface AudioContextType {
  muted: boolean;
  volume: number;
  setMuted: (v: boolean) => void;
  setVolume: (v: number) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [muted, setMutedState] = useState(false);
  const [volume, setVolumeState] = useState(0.5);

  useEffect(() => {
    const savedMuted = localStorage.getItem('animusx_muted');
    const savedVolume = localStorage.getItem('animusx_volume');
    
    if (savedMuted !== null) setMutedState(savedMuted === 'true');
    if (savedVolume !== null) setVolumeState(parseFloat(savedVolume));
  }, []);

  const setMuted = (v: boolean) => {
    setMutedState(v);
    localStorage.setItem('animusx_muted', String(v));
  };

  const setVolume = (v: number) => {
    setVolumeState(v);
    localStorage.setItem('animusx_volume', String(v));
  };

  return (
    <AudioContext.Provider value={{ muted, volume, setMuted, setVolume }}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
}
