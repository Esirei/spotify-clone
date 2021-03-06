import { FC } from 'react';
import { useRecoilValue } from 'recoil';
import { currentPlaylistState } from '~/atoms/playlistAtom';
import Song from '~/components/Song';

const Songs: FC = () => {
  const playlist = useRecoilValue(currentPlaylistState);
  return (
    <div className="px-4 flex flex-col pb-28 text-white/70">
      {playlist?.tracks.items.map((item, i) => (
        <Song key={item.track.id} item={item} order={i} />
      ))}
    </div>
  );
};

export default Songs;
