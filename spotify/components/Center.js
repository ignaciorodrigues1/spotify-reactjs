import { playlistIdState, playlistState } from "../atoms/playlistAtom";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import { ChevronDownIcon } from "@heroicons/react/outline";
import Songs from "./Songs";
import { shuffle } from "lodash";
import useSpotify from "../hooks/useSpotify";

const colors = [
  "from-indigo-500",
  "from-blue-500",
  "from-green-500",
  "from-red-500",
  "from-yellow-500",
  "from-pink-500",
  "from-purple-500",
];

function Center() {
  const { data: session } = useSession();
  const spotifyApi = useSpotify();
  const [color, setColor] = useState(null); 
  const playlistId = useRecoilValue(playlistIdState);
  const [playlist, setPlaylist] = useRecoilState(playlistState);

  useEffect(() => {
    setColor(shuffle(colors).pop());
  }, [playlistId]);

  useEffect(()=> {
    spotifyApi
    .getPlaylist(playlistId)
    .then((data) => {
      setPlaylist(data.body);
    })
    .catch((err) => console.log("Something went wrong!", err));
  }, [spotifyApi, playlistId]);

  console.log(playlist);

  return (
    <div className="flex flex-grow flex-col h-screen overflow-y-scroll scrollbar-hide">
      <header className="absolute top-5 right-8">
        <div className="flex items-center bg-black space-x-3 opacity-90 text-white hover:opacity-80 cursor-pointer rounded-full p-1 pr-2" onClick={signOut}>
          <img src={session?.user.image} className="rounded-full w-10 h-10" alt="" />
          <h2 className="">{session?.user.name}</h2>
          <ChevronDownIcon className="w-5 h-5" />
        </div>
      </header>
      <section className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} w-full h-80 text-white p-8`}>
        <img src={playlist?.images[0]?.url} className="w-44 h-44 shadow-2xl" alt="" />
        <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold">{playlist?.name}</h1>
      </section>

      <div>
        <Songs />
      </div>
    </div>
  )
}

export default Center;
