import { signIn, useSession } from 'next-auth/react';
import { useEffect } from 'react';
import spotifyApi from '~/libs/spotify';

const useSpotify = (): typeof spotifyApi => {
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      // if refresh token attempt fails, direct user to login
      if (session.error === 'RefreshTokenError') {
        void signIn();
      }

      spotifyApi.setAccessToken(session.user?.accessToken ?? '');
    }
  }, [session]);

  return spotifyApi;
};

export default useSpotify;
