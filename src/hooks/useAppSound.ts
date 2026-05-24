import useSound from 'use-sound';
import { useAudio } from '../contexts/AudioContext';
import { SoundPath, SOUND_ASSETS } from '../constants/sounds';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useAppSound(src: SoundPath | string, options?: any) {
  const { muted, volume } = useAudio();
  return useSound(src, { volume: muted ? 0 : volume, ...options });
}

export { SOUND_ASSETS };
