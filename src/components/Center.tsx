import { ChevronDownIcon } from '@heroicons/react/outline';
import { shuffle } from 'lodash';
import { signOut, useSession } from 'next-auth/react';
import { FC, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { currentPlaylistIdState, currentPlaylistState } from '~/atoms/playlistAtom';
import useSpotify from '~/hooks/useSpotify';
import Songs from './Songs';

const Center: FC = () => {
  const spotify = useSpotify();
  const { data: session } = useSession();
  const [color, setColor] = useState<string>(colors[0]);
  const playlistId = useRecoilValue(currentPlaylistIdState);
  const [playlist, setPlaylist] = useRecoilState(currentPlaylistState);

  console.log(playlist);

  useEffect(() => {
    setColor(shuffle(colors)[0]);
  }, [playlistId]);

  useEffect(() => {
    if (spotify.getAccessToken()) {
      spotify
        .getPlaylist(playlistId)
        .then(value => setPlaylist(value.body))
        .catch(reason => console.log('Something went wrong', reason));
    }
  }, [playlistId, setPlaylist, spotify]);

  return (
    <div className="h-screen grow overflow-y-auto text-white scrollbar-hide">
      <header className="absolute top-4 right-8">
        <button
          onClick={() => signOut()}
          className="flex items-center space-x-3 rounded-full bg-black p-1 pr-2 opacity-90 duration-200 hover:opacity-80">
          <img className="h-10 w-10 rounded-full" src={session?.user.image} alt="user profile" />
          <h2>{session?.user?.name}</h2>
          <ChevronDownIcon className="h-5 w-5" />
        </button>
      </header>

      <section className={`flex items-end space-x-7 bg-gradient-to-b ${color} h-80 to-black p-8`}>
        <img
          src={playlist?.images?.[0]?.url}
          alt={playlist?.name}
          className="h-44 w-44 shadow-2xl"
        />
        <div>
          <p>PLAYLIST</p>
          <h1 className="text-2xl font-bold md:text-3xl xl:text-5xl">{playlist?.name}</h1>
        </div>
      </section>

      <section>
        <Songs />
      </section>
    </div>
  );
};

export default Center;

const colors = [
  'from-indigo-500',
  'from-purple-500',
  'from-pink-500',
  'from-red-500',
  'from-orange-500',
  'from-yellow-500',
  'from-green-500',
  'from-teal-500',
  'from-blue-500',
];
