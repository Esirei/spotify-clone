import { FC } from 'react';
import { useRecoilValue } from 'recoil';
import { currentPlaylistState } from '~/atoms/playlistAtom';
import Song from '~/components/Song';

const Songs: FC = () => {
  const playlist = useRecoilValue(currentPlaylistState);
  return (
    <div className="px-8 flex flex-col space-y-1 pb-28">
      {playlist?.tracks.items.map(({ track }, i) => (
        <Song key={track.id} track={track} order={i} />
      ))}
    </div>
  );
};

export default Songs;
