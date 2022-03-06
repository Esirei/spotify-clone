import { VolumeUpIcon as VolumeDownIcon } from '@heroicons/react/outline';
import {
  FastForwardIcon,
  PauseIcon,
  PlayIcon,
  ReplyIcon,
  RewindIcon,
  SwitchHorizontalIcon,
  VolumeUpIcon,
} from '@heroicons/react/solid';
import { debounce } from 'lodash';
import { useSession } from 'next-auth/react';
import { FC, useCallback, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { currentTrackIdState, isPlayingState } from '~/atoms/trackAtom';
import useSpotify from '~/hooks/useSpotify';
import useTrackInfo from '~/hooks/useTrackInfo';

const Player: FC = () => {
  const spotify = useSpotify();
  const { data: session } = useSession();
  const [volume, setVolume] = useState(50);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
  const trackInfo = useTrackInfo();

  const fetchCurrentTrack = useCallback(async () => {
    const response = await spotify.getMyCurrentPlaybackState();
    setCurrentTrackId(response.body?.item?.id);
    setIsPlaying(!!response.body?.is_playing);
  }, [setCurrentTrackId, setIsPlaying, spotify]);

  useEffect(() => {
    if (spotify.getAccessToken() && !currentTrackId) {
      void fetchCurrentTrack();
    }
  }, [currentTrackId, spotify, session, fetchCurrentTrack]);

  const handlePlayPause = useCallback(async () => {
    const { body } = await spotify.getMyCurrentPlaybackState();
    if (body?.is_playing) {
      await spotify.pause();
    } else {
      await spotify.play();
    }
    setCurrentTrackId(body?.item?.id);
    setIsPlaying(!body?.is_playing);
  }, [setCurrentTrackId, setIsPlaying, spotify]);

  const decreaseVolume = () => setVolume(Math.max(0, volume - 10));

  const increaseVolume = () => setVolume(Math.min(100, volume + 10));

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleVolumeChange = useCallback(
    debounce(async volume => await spotify.setVolume(volume), 500),
    [spotify],
  );

  useEffect(() => {
    if (spotify.getAccessToken()) {
      void handleVolumeChange(volume);
    }
  }, [handleVolumeChange, spotify, volume]);

  const images = trackInfo?.album.images || [];
  const art = (images.find(i => i.width === 300) ?? images?.[0])?.url;

  console.log('trackInfo', trackInfo, art);

  return (
    <div className="grid h-24 grid-cols-3 bg-gradient-to-b from-black to-gray-900 px-2 text-xs text-white md:px-4 md:text-base">
      <div className="flex items-center space-x-4">
        <img className="hidden h-16 w-16 md:inline" src={art} alt={trackInfo?.album.name} />
        <div className="truncate">
          <h3 className="truncate">{trackInfo?.name}</h3>
          <p className="truncate text-xs text-white/70">
            {trackInfo?.artists.map(artist => artist.name).join(', ')}
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center justify-evenly text-white/70">
        <div className="flex items-center space-x-4">
          <SwitchHorizontalIcon className="player-button" />
          <RewindIcon className="player-button" />
          {isPlaying ? (
            <PauseIcon onClick={handlePlayPause} className="player-button h-10 w-10 text-white" />
          ) : (
            <PlayIcon onClick={handlePlayPause} className="player-button h-10 w-10 text-white" />
          )}
          <FastForwardIcon className="player-button" />
          <ReplyIcon className="player-button" />
        </div>
      </div>

      <div className="flex items-center justify-end space-x-4">
        <VolumeDownIcon onClick={decreaseVolume} className="player-button" />
        <input
          type="range"
          min={0}
          max={100}
          value={volume}
          onChange={e => setVolume(Number(e.target.value))}
        />
        <VolumeUpIcon onClick={increaseVolume} className="player-button" />
      </div>
    </div>
  );
};

export default Player;
