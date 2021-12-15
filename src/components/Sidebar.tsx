import {
  HeartIcon,
  HomeIcon,
  LibraryIcon,
  PlusCircleIcon,
  RssIcon,
  SearchIcon,
} from '@heroicons/react/outline';
import { useSession } from 'next-auth/react';
import { FC, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { currentPlaylistIdState } from '~/atoms/playlistAtom';
import useSpotify from '~/hooks/useSpotify';
import PlaylistObjectSimplified = SpotifyApi.PlaylistObjectSimplified;

const Sidebar: FC = () => {
  const { data: session } = useSession();
  const spotify = useSpotify();
  const [playlists, setPlaylists] = useState<PlaylistObjectSimplified[]>([]);
  const [playlistId, setPlaylistId] = useRecoilState(currentPlaylistIdState);

  useEffect(() => {
    if (spotify.getAccessToken()) {
      void spotify.getUserPlaylists().then(playlists => {
        setPlaylists(playlists.body.items);
      });
    }
  }, [session, spotify]);

  console.log(playlists);

  return (
    <div className="hidden overflow-auto p-5 h-screen text-xs text-gray-500 border-r border-gray-900 sm:text-sm sm:max-w-[12rem] md:block lg:max-w-[15rem] scrollbar-hide">
      <div className="space-y-4">
        <button className="flex items-center space-x-2 hover:text-white">
          <HomeIcon className="w-5 h-5" />
          <span>Home</span>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <SearchIcon className="w-5 h-5" />
          <span>Search</span>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <LibraryIcon className="w-5 h-5" />
          <span>Your Library</span>
        </button>

        <hr className="border-gray-900" />

        <button className="flex items-center space-x-2 hover:text-white">
          <PlusCircleIcon className="w-5 h-5" />
          <span>Create Playlist</span>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <HeartIcon className="w-5 h-5" />
          <span>Liked Songs</span>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <RssIcon className="w-5 h-5" />
          <span>Your Episodes</span>
        </button>

        <hr className="border-gray-900" />

        {playlists.map(playlist => (
          <button
            key={playlist.id}
            className={`block w-full text-left hover:text-white ${
              playlistId === playlist.id ? 'text-white' : ''
            }`}
            onClick={() => setPlaylistId(playlist.id)}>
            {playlist.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
