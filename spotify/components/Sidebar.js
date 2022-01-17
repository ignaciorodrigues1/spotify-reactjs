import {
  HeartIcon,
  HomeIcon,
  LibraryIcon,
  PlusCircleIcon,
  RssIcon,
  SearchIcon,
} from "@heroicons/react/outline";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import { playlistIdState } from "../atoms/playlistAtom";
import { useRecoilState } from "recoil";
import useSpotify from "../hooks/useSpotify";

function Sidebar() {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [playlists, setPlaylists] = useState([]);
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);
  
  console.log("You picked playlist >>>>>", playlistId);
  
  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => {
        setPlaylists(data.body.items);
      });
    }
  }, [session, spotifyApi])

  console.log(playlists);
  
  return (
    <div className="text-gray-500 p-5 text-xs border-r border-gray-900 overflow-y-scroll scrollbar-hide h-screen lg:text-sm sm:max-w-[12rem] lg:max-w-[15rem] hidden md:inline-flex pb-36">
      <div className="space-y-4">
        <button className="flex items-center space-x-2 hover:text-white">
          <HomeIcon className="h-5 w-5" />
          <p>Home</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <SearchIcon className="h-5 w-5" />
          <p>Search</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white"> 
          <LibraryIcon className="h-5 w-5" />
          <p>Your Library</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900" />
        <button className="flex items-center space-x-2 hover:text-white">
          <PlusCircleIcon className="h-5 w-5" />
          <p>Create Playlist</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <RssIcon className="h-5 w-5" />
          <p>Your episodes</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white"> 
          <HeartIcon className="h-5 w-5" />
          <p>Liked Songs</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900" />
        {/* Playlist ... */}
        {playlists.map((playlist) => (
          <div key={playlist.id} className="flex items-center space-x-4" onClick={() => setPlaylistId(playlist.id)}>
            <img src={playlist.images[0].url} alt={playlist.name} className="w-10 h-10 rounded-full" />
            <p key={playlist.id} className="cursor-pointer hover:text-white">
              {playlist.name}
            </p>
          </div>
        ))}
        
      </div>
    </div>
  );
}

export default Sidebar;
