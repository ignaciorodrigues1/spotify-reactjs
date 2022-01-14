import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";

import { millisToMinutesAndSeconds } from "../lib/time";
import { useRecoilState } from "recoil";
import useSpotify from "../hooks/useSpotify";

function Song({ order, track }) {
  const spotifyApi = useSpotify();
  const [currenTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

  const playSong = () => {
    setCurrentTrackId(track.track.id);
    setIsPlaying(true);
    spotifyApi.play({
      uris: [track.track.uri],
    });
  };

  return (
    <div className="grid grid-cols-2 py-4 px-5 hover:bg-gray-900 rounded-lg cursor-pointer" onClick={playSong}>
      <div className="flex items-center space-x-4">
        <p className="text-white">{order + 1}</p>
        <img src={track.track.album.images[0].url} className="h-10 w-10" />
        <div>
          <p className="w-36 lg:w-64 truncate text-white">{track.track.name}</p>
          <p className="w-40 text-gray-500">{track.track.artists[0].name}</p>
        </div>
      </div>
      
      <div className="flex items-center justify-between ml-auto md:ml-0 text-white">
        <p className="w-40 text-gray-500 hidden md:inline">{track.track.album.name}</p>
        <p className="text-gray-500">{millisToMinutesAndSeconds(track.track.duration_ms)}</p>
      </div>
    </div>
  );
}

export default Song;