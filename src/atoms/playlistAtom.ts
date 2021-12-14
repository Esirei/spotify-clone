import { atom } from 'recoil';
import SinglePlaylistResponse = SpotifyApi.SinglePlaylistResponse;

export const currentPlaylistIdState = atom({
  key: 'currentPlaylistId',
  default: '',
});

export const currentPlaylistState = atom<SinglePlaylistResponse>({
  key: 'currentPlaylist',
  default: undefined,
});
