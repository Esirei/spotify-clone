import NextAuth from 'next-auth';
import { JWT } from 'next-auth/jwt';
import Spotify from 'next-auth/providers/spotify';
import spotifyApi, { LOGIN_URL } from '~/libs/spotify';

export default NextAuth({
  pages: {
    signIn: '/login',
  },
  providers: [
    Spotify({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      authorization: LOGIN_URL,
    }),
  ],
  secret: process.env.JWT_SECRET,
  callbacks: {
    jwt: async ({ token, account, user }) => {
      // initial sign in
      if (account && user) {
        console.log('initial sign in', account, user, token);
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          username: account.providerAccountId,
          accessTokenExpiresAt: account.expires_at * 1000, // expires_at is date in seconds when token expires
        };
      }

      // token has not expired
      if (Date.now() < token.accessTokenExpiresAt) {
        console.log('token not expired');
        return token;
      }

      // refresh token
      console.log('token expired, refreshing...');
      return await refreshToken(token);
    },
  },
});

const refreshToken = async (token: JWT): Promise<JWT> => {
  try {
    spotifyApi.setAccessToken(token.accessToken);
    spotifyApi.setRefreshToken(token.refreshToken);
    const { body } = await spotifyApi.refreshAccessToken();

    console.log('token refreshed', body);
    return {
      ...token,
      accessToken: body.access_token,
      accessTokenExpiresAt: body.expires_in * 1000 + Date.now(), // expires_in is seconds till token expires
      refreshToken: body.refresh_token ?? token.refreshToken,
    };
  } catch (e) {
    console.error('token refresh error', e);
    return {
      ...token,
      error: 'RefreshTokenError',
    };
  }
};
