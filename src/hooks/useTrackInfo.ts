import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { currentTrackIdState } from '~/atoms/trackAtom';
import useSpotify from '~/hooks/useSpotify';
import TrackObjectFull = SpotifyApi.TrackObjectFull;

const useTrackInfo = (): TrackObjectFull | null => {
  const spotify = useSpotify();
  const currentTrackId = useRecoilValue(currentTrackIdState);
  const [trackInfo, setTrackInfo] = useState<TrackObjectFull | null>(null);

  useEffect(() => {
    const getTrackInfo = async () => {
      if (currentTrackId && spotify.getAccessToken()) {
        const track = await spotify.getTrack(currentTrackId);
        setTrackInfo(track.body);
      }
    };

    void getTrackInfo();
    // setTimeout(() => void getTrackInfo(), 1000);
  }, [spotify, currentTrackId]);

  return trackInfo;
};

export default useTrackInfo;
