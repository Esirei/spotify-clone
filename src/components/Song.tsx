import { PlayIcon } from '@heroicons/react/solid';
import { FC } from 'react';
import { useRecoilState } from 'recoil';
import TimeAgo from 'timeago-react';
import { currentTrackIdState, isPlayingState } from '~/atoms/trackAtom';
import useSpotify from '~/hooks/useSpotify';
import { millisToMinutesAndSeconds } from '~/libs/time';
import PlaylistTrackObject = SpotifyApi.PlaylistTrackObject;

interface Props {
  item: PlaylistTrackObject;
  order: number;
}

const Song: FC<Props> = ({ item: { track, added_at }, order }) => {
  const spotify = useSpotify();
  const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

  const playTrack = async () => {
    await spotify.play({
      uris: [track.uri],
    });
    setCurrentTrackId(track.id);
    setIsPlaying(true);
  };

  // Get image with smallest width
  const image = track.album.images.reduce((acc, curr) => (curr.width < acc.width ? curr : acc)).url;

  return (
    <div className="grid grid-cols-4 px-5 py-1.5 space-x-4 md:grid-cols-6 lg:grid-cols-8 group hover:bg-white/10 rounded">
      <div className="flex col-span-3 items-center space-x-4">
        <button
          onClick={playTrack}
          className="w-6 h-6"
          title={`Play ${track.name} by ${track.artists.map(artist => artist.name).join(', ')}`}>
          <p className="text-right group-hover:hidden">{order + 1}</p>
          <PlayIcon className="hidden text-white group-hover:block" />
        </button>
        <img className="w-10 h-10" src={image} alt={track.album.name} />
        <div className="truncate">
          <p className="text-white truncate">{track.name}</p>
          <p className="truncate group-hover:text-white">
            {track.artists.map(artist => artist.name).join(', ')}
          </p>
        </div>
      </div>

      <div className="hidden col-span-2 md:flex md:items-center">
        <p className="truncate group-hover:text-white">{track.album.name}</p>
      </div>

      <div className="hidden col-span-2 lg:flex lg:items-center">
        <TimeAgo datetime={added_at} live />
      </div>

      <div className="flex justify-end items-center">
        <p>{millisToMinutesAndSeconds(track.duration_ms)}</p>
      </div>
    </div>
  );
};

export default Song;
