import { FC } from 'react';
import TrackObjectFull = SpotifyApi.TrackObjectFull;

interface Props {
  track: TrackObjectFull;
  order: number;
}

const Song: FC<Props> = ({ track }) => {
  return (
    <div>
      {track.name}
    </div>
  );
};

export default Song;
