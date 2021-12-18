import { atom } from 'recoil';

export const currentTrackIdState = atom<string | undefined>({
  key: 'currentTrackId',
  default: undefined,
});

export const isPlayingState = atom({
  key: 'isPlaying',
  default: false,
});
