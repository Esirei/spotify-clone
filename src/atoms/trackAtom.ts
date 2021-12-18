import { atom } from 'recoil';

export const currentTrackIdState = atom({
  key: 'currentTrackId',
  default: undefined,
});

export const isPlayingState = atom({
  key: 'isPlaying',
  default: false,
});
