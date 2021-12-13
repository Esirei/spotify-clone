import NextAuth from 'next-auth';
import Spotify from 'next-auth/providers/spotify';
import { LOGIN_URL } from '~/libs/spotify';

export default NextAuth({
  providers: [
    Spotify({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      authorization: LOGIN_URL,
    }),
  ],
  secret: process.env.JWT_SECRET,
});
