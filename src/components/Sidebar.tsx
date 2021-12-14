import {
  HeartIcon,
  HomeIcon,
  LibraryIcon,
  PlusCircleIcon,
  RssIcon,
  SearchIcon,
} from '@heroicons/react/outline';
import { FC } from 'react';

const Sidebar: FC = () => {
  return (
    <div className="text-gray-500 p-5 text-sm border-r border-gray-900 h-screen overflow-auto">
      <div className="space-y-4">
        <button className="flex items-center space-x-2 hover:text-white">
          <HomeIcon className="h-5 w-5" />
          <span>Home</span>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <SearchIcon className="h-5 w-5" />
          <span>Search</span>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <LibraryIcon className="h-5 w-5" />
          <span>Your Library</span>
        </button>

        <hr className="border-gray-900" />

        <button className="flex items-center space-x-2 hover:text-white">
          <PlusCircleIcon className="h-5 w-5" />
          <span>Create Playlist</span>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <HeartIcon className="h-5 w-5" />
          <span>Liked Songs</span>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <RssIcon className="h-5 w-5" />
          <span>Your Episodes</span>
        </button>

        <hr className="border-gray-900" />

        {Array.from(Array(20)).map((_, i) => (
          <p key={i} className="cursor-pointer hover:text-white">
            Playlist name...
          </p>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
