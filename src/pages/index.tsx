import Head from 'next/head';
import React from 'react';
import Sidebar from '~/components/Sidebar';

export default function Home(): React.ReactElement {
  return (
    <div className="">
      <Head>
        <title>Spotify</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Sidebar />
      </main>
      <div></div>
    </div>
  );
}
