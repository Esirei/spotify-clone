import Head from 'next/head';
import React from 'react';
import Center from '~/components/Center';
import Player from '~/components/Player';
import Sidebar from '~/components/Sidebar';

export default function Home(): React.ReactElement {
  return (
    <div className="bg-black h-screen overflow-hidden">
      <Head>
        <title>Spotify</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex">
        <Sidebar />
        <Center />
      </main>

      <div className="sticky bottom-0">
        <Player />
      </div>
    </div>
  );
}
