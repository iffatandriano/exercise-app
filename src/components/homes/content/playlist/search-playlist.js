import React, { useState } from "react";
import { PlusIcon, SearchIcon, TrashIcon } from "@heroicons/react/outline";
import { url_spotify } from "../../../../lib/axios";
import Song from "./Song";

function SearchPlaylist({
  user_id,
  playlist_id,
  getLastPlaylist,
  new_playlist,
  getPlaylistTrack,
  listTrack,
  setIsLoading,
}) {
  const [searchKey, setSearchKey] = useState("");
  const [tracks, setTracks] = useState([]);
  const [checkInPlaylist, setCheckInPlaylist] = useState(0);
  const [trackAdded, setTrackAdded] = useState([]);

  const searchSong = async (e) => {
    try {
      e.preventDefault();
      const access_token = localStorage.getItem("token");
      const { data, status } = await url_spotify("/search", {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
        params: {
          q: searchKey,
          type: "track",
          limit: 5,
        },
      });

      let my_tracks = data.tracks.items;
      console.log(my_tracks);
      if (status !== 200) {
        setCheckInPlaylist(0);
      } else {
        setTracks(my_tracks);
        getLastPlaylist();
        getPlaylistTrack();
        setCheckInPlaylist(1);
      }
    } catch (error) {
      if (error.response === undefined) {
        console.error(error);
      } else {
        console.error(error);
      }
    }
  };

  const handleSongAdded = (track) => {
    const index = trackAdded.findIndex((add) => add.uri === track.uri);
    if (index === -1) {
      setTrackAdded([track, ...trackAdded]);
    } else {
      const newAdded = trackAdded.filter((add) => add.uri !== track.uri);
      setTrackAdded(newAdded);
    }
  };

  const isAddedSong = (track) => {
    const index = trackAdded.findIndex((add) => add.uri === track.uri);
    if (index === -1) {
      return false;
    }
    return true;
  };

  const handleClearSelection = (e) => {
    e.preventDefault();
    setTrackAdded([]);
  };

  const handleAddToPlaylist = async (trackIsAdded) => {
    try {
      const track_uri = trackIsAdded.map((track) => track.uri);
      const token = localStorage.getItem("token");
      //   let last_position = 0;
      let playlistId = playlist_id;

      if (listTrack.length > 0) {
        var last_position = listTrack.length - 1;
      } else {
        var last_position = 0;
      }

      let data_track = {
        position: last_position,
        uris: track_uri,
      };

      const { status, statusText } = await url_spotify.post(
        `/playlists/${playlistId}/tracks`,
        data_track,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (status !== 201) {
        console.error(statusText);
      } else {
        setTrackAdded([]);
        getPlaylistTrack();
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div className="flex flex-col p-8">
        <span className="font-bold text-gray-300">
          Let's find something for your playlist
        </span>
        <div className="flex flex-row">
          <form>
            <input
              className="mt-2 rounded-md h-10 bg-gray-500 text-gray-300 px-3 py-2"
              type="text"
              placeholder="Search for songs"
              onChange={(e) => setSearchKey(e.target.value)}
            />
            <button
              className="ml-4 bg-slate-800 text-gray-400 rounded-md px-3 py-2 mt-2"
              type="submit"
              onClick={(e) => searchSong(e)}
            >
              <SearchIcon className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
      <div className="flex justify-end text-white pr-8">
        <button
          className="bg-green-500 py-2 px-4 rounded-lg inline-flex items-center hover:bg-green-600 disabled:opacity-25"
          onClick={(e) => handleClearSelection(e)}
          disabled={trackAdded.length > 0 ? false : true}
        >
          <TrashIcon className="fill-current h-5 w-5" />
          <p className="ml-2">Clear selection</p>
        </button>
        <button
          className="bg-green-500 ml-2 py-2 px-4 rounded-lg inline-flex items-center hover:bg-green-600 disabled:opacity-25"
          onClick={() => handleAddToPlaylist(trackAdded)}
          disabled={trackAdded.length > 0 ? false : true}
        >
          <PlusIcon className="fill-current h-5 w-5" />
          <p className="ml-2">Add to playlist</p>
        </button>
      </div>
      {checkInPlaylist > 0 && searchKey !== "" ? (
        tracks.map((track) => {
          const newTrack = {
            ...track,
            isAdd: isAddedSong(track),
          };
          const {
            album: {
              images: [{ url }],
              name,
            },
            artists: [{ name: artist }],
            name: title,
            duration_ms,
            uri,
            isAdd,
          } = newTrack;
          return (
            <Song
              key={uri}
              image_url={url}
              album_name={name}
              title_song={title}
              song_artist={artist}
              duration={duration_ms}
              tracks={tracks}
              onSelect={() => handleSongAdded(track)}
              isAdded={isAdd}
            />
          );
        })
      ) : (
        <div className="flex justify-center mt-20">
          <p className="text-gray-500">Please search song first.</p>
        </div>
      )}
    </>
  );
}

export default SearchPlaylist;
