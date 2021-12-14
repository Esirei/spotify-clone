import { ChevronDownIcon } from '@heroicons/react/outline';
import { shuffle } from 'lodash';
import { useSession } from 'next-auth/react';
import { FC, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { currentPlaylistIdState, currentPlaylistState } from '~/atoms/playlistAtom';
import useSpotify from '~/hooks/useSpotify';

const Center: FC = () => {
  const spotify = useSpotify();
  const { data: session } = useSession();
  const [color, setColor] = useState<string>(null);
  const playlistId = useRecoilValue(currentPlaylistIdState);
  const [playlist, setPlaylist] = useRecoilState(currentPlaylistState);

  console.log(playlist);

  useEffect(() => {
    setColor(shuffle(colors).pop());
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
    <div className="grow">
      <header className="absolute top-4 right-8 text-white">
        <div className="flex items-center p-1 pr-2 space-x-3 bg-black rounded-full opacity-90 duration-200 hover:opacity-80">
          <img className="w-10 h-10 rounded-full" src={session?.user?.image} alt="user profile" />
          <h2>{session?.user?.name}</h2>
          <ChevronDownIcon className="w-5 h-5" />
        </div>
      </header>

      <section
        className={`flex items-end space-x-7 bg-gradient-to-b ${color} to-black h-80 text-white p-8`}>
        <h1>Hello</h1>
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
