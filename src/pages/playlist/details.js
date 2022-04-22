import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner";
import MainContent from "../../components/MainContent";

// MUI component
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { MusicNoteIcon } from "@heroicons/react/outline";
import { TextField } from "@mui/material";

// service
import { getDetailsPlaylist } from "../../services/playlist/detailsPlaylist";
import { getSearchData } from "../../services/search";
import { getMyTrackPlaylist } from "../../services/playlist/getTrackFromPlaylist";
import millisToMinutesAndSeconds from "../../utils/millisToMinutesAndSeconds";

function PlaylistDetails() {
  const history = useHistory();
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [detailsPlaylist, setDetailsPlaylist] = useState([]);
  //   const [searchValue, setSearchValue] = useState("");
  const [trackPlaylist, setTrackPlaylist] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      history.push("/login");
    } else {
      getMyPlaylist();
      GetPlaylistItem();
    }
  }, []);

  const getMyPlaylist = async () => {
    try {
      let my_token = localStorage.getItem("token");
      let playlistId = params.playlistId;

      const { data, status, statusText } = await getDetailsPlaylist(
        my_token,
        playlistId
      );

      let my_detailsPlaylist = data;

      if (status !== 200) {
        console.error(statusText);
      } else {
        setDetailsPlaylist(my_detailsPlaylist);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const GetPlaylistItem = async () => {
    try {
      let token = localStorage.getItem("token");
      let playlistsId = params.playlistId;

      const { data, status, statusText } = await getMyTrackPlaylist(
        token,
        playlistsId
      );

      let my_tracks = data.items;

      if (status !== 200) {
        console.error(statusText);
      } else {
        setTrackPlaylist(my_tracks);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleToSearch = (e) => {
    e.preventDefault();
    let playlistId = params.playlistId;
    history.push(`/playlist/${playlistId}/search`);
  };

  return (
    <MainContent>
      <div className="flex flex-col">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            <div className="w-full flex flex-col px-4 py-4">
              <div className="flex justify-between">
                <div className="">
                  <Link to="/playlist">
                    <ArrowBackIcon />
                  </Link>
                </div>
                <h1 className="font-semibold text-slate-700 text-md">
                  Playlist Details
                </h1>
                <div></div>
              </div>
              {detailsPlaylist !== undefined ? (
                <>
                  <div className="w-full mt-6 flex flex-col">
                    <div className="flex flex-col items-center justify-center">
                      <MusicNoteIcon
                        className="border border-slate-600 "
                        style={{ width: "50px", height: "50px" }}
                      />
                      <span className="font-semibold text-lg mt-2">
                        {detailsPlaylist.name}
                      </span>
                    </div>
                    <div className="mt-4">
                      <h1 className="font-semibold">Your playlist</h1>
                      {trackPlaylist.length > 0 ? (
                        trackPlaylist.map((track_playlist) => (
                          <>
                            <div className="mt-2 flex flex-row justify-between">
                              <div className="flex flex-row">
                                <img
                                  src={track_playlist.track.album.images[1].url}
                                  alt="playlist-image"
                                  style={{ height: "50px", width: "50px" }}
                                />
                                <div className="ml-4 flex flex-col">
                                  <span className="text-lg font-semibold">
                                    {track_playlist.track.album.name}
                                  </span>
                                  <span className="text-sm text-slate-600">
                                    {track_playlist.track.album.album_type} .
                                    {track_playlist.track.album.artists[0].name}
                                  </span>
                                </div>
                              </div>
                              <span className="text-slate-600 mr-10">
                                {millisToMinutesAndSeconds(
                                  track_playlist.track.duration_ms
                                )}
                              </span>
                            </div>
                          </>
                        ))
                      ) : (
                        <span className="flex justify-center font-bold mt-6">
                          No playlist
                        </span>
                      )}
                      <div className="mt-6 flex justify-center">
                        {/* <TextField
                          value={searchValue}
                          placeholder="Judul lagu, album, etc"
                          className="w-full"
                          onChange={(e) => setSearchValue(e.target.value)}
                        /> */}
                        <button
                          className="bg-blue-600 hover:bg-blue-500 px-4 py-4 rounded rounded-lg text-white"
                          onClick={(e) => handleToSearch(e)}
                        >
                          Tambah lagu baru
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div>Kosong</div>
              )}
            </div>
            <div
              style={{
                boxShadow: "0px -1px 4px rgba(0, 0, 0, 0.138389)",
                maxWidth: "500px",
              }}
              className="w-full absolute bottom-0 flex flex-wrap justify-around items-center"
            >
              <Link to="/home">
                <button className="focus:outline-none flex flex-col justify-center items-center">
                  <img src="/home.png" style={{ height: 28, width: 28 }} />
                  <span className="text-sm text-abu">Home</span>
                </button>
              </Link>
              <Link to="/playlist">
                <button className="focus:outline-none my-3 flex flex-col justify-center items-center">
                  <img src="/playlist.png" style={{ height: 28, width: 28 }} />
                  <span className="font-semibold text-sm">Koleksi Kamu</span>
                </button>
              </Link>
              <Link to="/profile">
                <button className="focus:outline-none flex flex-col justify-center items-center">
                  <img src="/person.png" style={{ height: 28, width: 28 }} />
                  <span className="text-sm text-abu ">Profil</span>
                </button>
              </Link>
            </div>
          </>
        )}
      </div>
    </MainContent>
  );
}

export default PlaylistDetails;
