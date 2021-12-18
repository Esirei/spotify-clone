import { FC } from 'react';
import TimeAgo from 'timeago-react';
import { millisToMinutesAndSeconds } from '~/libs/time';
import PlaylistTrackObject = SpotifyApi.PlaylistTrackObject;

interface Props {
  item: PlaylistTrackObject;
  order: number;
}

const Song: FC<Props> = ({ item: { track, added_at }, order }) => {
  // Get image with smallest width
  const image = track.album.images.reduce((acc, curr) => (curr.width < acc.width ? curr : acc)).url;

  return (
    <div className="grid grid-cols-4 space-x-4 md:grid-cols-6 lg:grid-cols-8">
      <div className="flex col-span-3 items-center space-x-4">
        <p>{order + 1}</p>
        <img className="w-10 h-10" src={image} alt={track.album.name} />
        <div>
          <p className="text-white truncate">{track.name}</p>
          <p className="truncate">{track.artists.map(artist => artist.name).join(', ')}</p>
        </div>
      </div>

      <div className="hidden col-span-2 md:flex md:items-center">
        <p className="truncate">{track.album.name}</p>
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
