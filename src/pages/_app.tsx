import { SessionProvider, SessionProviderProps } from 'next-auth/react';
import { AppProps } from 'next/app';
import { FC } from 'react';
import '~/styles/globals.css';

interface Props extends AppProps {
  pageProps: SessionProviderProps;
}

const MyApp: FC<Props> = ({ Component, pageProps }) => {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default MyApp;
