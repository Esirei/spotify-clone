import Spotify from 'spotify-web-api-node';

const scopes = [
  'user-read-email',
  'user-read-private',
  'playlist-read-private',
  'playlist-read-collaborative',
  // 'playlist-modify-public',
  // 'playlist-modify-private',
  'streaming',
  'user-library-read',
  // 'user-library-modify',
  'user-follow-read',
  // 'user-follow-modify',
  'user-top-read',
  'user-read-playback-state',
  'user-read-recently-played',
  'user-read-currently-playing',
  'user-modify-playback-state',
].join(',');

const params = new URLSearchParams({ scope: scopes }).toString();

const LOGIN_URL = `https://accounts.spotify.com/authorize?${params}`;

const spotifyApi = new Spotify({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
});

export default spotifyApi;
export { LOGIN_URL };
