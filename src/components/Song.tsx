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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
    <div className="group grid grid-cols-4 space-x-4 rounded px-5 py-1.5 hover:bg-white/10 md:grid-cols-6 lg:grid-cols-8">
      <div className="col-span-3 flex items-center space-x-4">
        <button
          onClick={playTrack}
          className="h-6 w-6"
          title={`Play ${track.name} by ${track.artists.map(artist => artist.name).join(', ')}`}>
          <p className="h-6 w-6 text-right group-hover:hidden">{order + 1}</p>
          <PlayIcon className="hidden h-6 w-6 text-white group-hover:block" />
        </button>
        <img className="h-10 w-10" src={image} alt={track.album.name} />
        <div className="truncate">
          <p className="truncate text-white">{track.name}</p>
          <p className="truncate group-hover:text-white">
            {track.artists.map(artist => artist.name).join(', ')}
          </p>
        </div>
      </div>

      <div className="col-span-2 hidden md:flex md:items-center">
        <p className="truncate group-hover:text-white">{track.album.name}</p>
      </div>

      <div className="col-span-2 hidden lg:flex lg:items-center">
        <TimeAgo datetime={added_at} live />
      </div>

      <div className="flex items-center justify-end">
        <p>{millisToMinutesAndSeconds(track.duration_ms)}</p>
      </div>
    </div>
  );
};

export default Song;
