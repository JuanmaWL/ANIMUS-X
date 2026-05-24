import useSound from 'use-sound';
import { useAudio } from '../contexts/AudioContext';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useAppSound(src: string, options?: any) {
  const { muted, volume } = useAudio();
  return useSound(src, { volume: muted ? 0 : volume, ...options });
}
