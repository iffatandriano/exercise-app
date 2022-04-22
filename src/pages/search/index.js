import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import MainContent from "../../components/MainContent";
import LoadingSpinner from "../../components/LoadingSpinner";

// redux
import { useDispatch, useSelector } from "react-redux";
import { setMyUserId } from "../../middleware/store/action";

// MUI Components
import { TextField } from "@mui/material";
import { getSearchData } from "../../services/search";

// services
import { getCurrentProfile } from "../../services/spotify/profile/currentprofile";
import DialogCreateContent from "../../components/DialogCreateContent";
import {
  createPlaylist,
  inputTrackToPlaylist,
} from "../../services/search/CreatePlaylist";
import { url_spotify } from "../../lib/axios";

// MUI Components
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function Search() {
  const [isLoading, setIsLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [tracks, setTracks] = useState([]);
  const [tracksAdded, setTracksAdded] = useState([]);
  // const [checkInPlaylist, setCheckInPlaylist] = useState(0);
  // history
  const history = useHistory();
  const params = useParams();

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, [isLoading]);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      history.push("/login");
    }
  }, []);

  const handleSearchTrack = async () => {
    try {
      let my_token = localStorage.getItem("token");
      let searchKey = searchValue;

      const { data, status, statusText } = await getSearchData(
        my_token,
        searchKey
      );

      if (status !== 200) {
        console.error(statusText);
      } else {
        let my_tracks = data.tracks.items;
        setTracks(my_tracks);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleTrackAdded = (track) => {
    const index = tracksAdded.findIndex((add) => add.uri === track.uri);
    if (index === -1) {
      setTracksAdded([track, ...tracksAdded]);
    } else {
      const newTrackAdded = tracksAdded.filter((add) => add.uri !== track.uri);
      setTracksAdded(newTrackAdded);
    }
  };

  const isAddedTrack = (track) => {
    const index = tracksAdded.findIndex((add) => add.uri === track.uri);
    if (index === -1) {
      return false;
    }
    return true;
  };

  const handleAddToPlaylist = async (trackIsAdded) => {
    try {
      const token = localStorage.getItem("token");

      const track_uri = trackIsAdded.map((track) => track.uri);
      let playlistsId = params.playlistId;

      const response = await inputTrackToPlaylist(
        track_uri,
        token,
        playlistsId
      );

      // console.log(response);
      if (response.status !== 201) {
        console.error(response.statusText);
      } else {
        setTracksAdded([]);
        setSearchValue("");
        setTracks([]);
        history.push(`/playlist/${playlistsId}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleClearSelection = (e) => {
    e.preventDefault();
    setTracksAdded([]);
    setTracks([]);
    setSearchValue("");
  };

  const handleKeySearchTrack = (e) => {
    if (e.key === "Enter") {
      searchValue === "" ? setTracks([]) : handleSearchTrack();
    }
  };

  const handleBackToPlaylist = (e) => {
    e.preventDefault();
    let playlist_id = params.playlistId;
    history.push(`/playlist/${playlist_id}`);
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
                {/* <h1 className="font-semibold text-slate-700 text-2xl">Cari</h1> */}
                <button onClick={(e) => handleBackToPlaylist(e)}>
                  <ArrowBackIcon className="h-10 w-10" />
                </button>
                <div className="ml-2 mt-0">
                  <button
                    className="bg-red-500 py-2 px-4 rounded-lg inline-flex items-center hover:bg-red-600 disabled:opacity-25"
                    disabled={tracksAdded.length > 0 ? false : true}
                    onClick={(e) => handleClearSelection(e)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  <button
                    className="bg-blue-500 py-2 px-4 rounded-lg inline-flex items-center ml-2 hover:bg-blue-600 disabled:opacity-25"
                    disabled={tracksAdded.length > 0 ? false : true}
                    onClick={() => handleAddToPlaylist(tracksAdded)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="mt-4">
                <TextField
                  value={searchValue}
                  placeholder="Judul lagu, album, etc"
                  className="w-full"
                  onChange={(e) => setSearchValue(e.target.value)}
                  onKeyDown={(e) => handleKeySearchTrack(e)}
                />
              </div>
              <div className="w-full mt-6 flex flex-col">
                {tracks.length > 0 ? (
                  tracks.map((my_tracks) => {
                    const newTrack = {
                      ...my_tracks,
                      isAdd: isAddedTrack(my_tracks),
                    };
                    const {
                      album: {
                        images: [{ url }],
                        name,
                      },
                      artists: [{ name: artist }],
                      name: title,
                      uri,
                      isAdd,
                    } = newTrack;
                    return (
                      <>
                        <div
                          className="flex flex-row justify-between mt-2"
                          key={uri}
                        >
                          <div className="flex flex-row">
                            <img
                              src={url}
                              alt="image-track"
                              style={{ height: "70px", width: "70px" }}
                            />
                            <div className="flex flex-col ml-4">
                              <span className="text-lg font-semibold">
                                {name}
                              </span>
                              <span className="text-sm text-slate-600">
                                Album . {artist}
                              </span>
                            </div>
                          </div>
                          <button
                            className="mr-4"
                            onClick={() => handleTrackAdded(my_tracks)}
                          >
                            {isAdd ? (
                              "Added"
                            ) : (
                              <img
                                src="/add-to-playlist.png"
                                alt="btn-addPlaylist"
                              />
                            )}
                          </button>
                        </div>
                      </>
                    );
                  })
                ) : (
                  <div className="flex justify-center"></div>
                )}
              </div>
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
              {/* <Link to="/search">
                <button className="focus:outline-none my-3 flex flex-col justify-center items-center">
                  <img src="/search.png" style={{ height: 28, width: 28 }} />
                  <span className="font-semibold text-sm">Cari</span>
                </button>
              </Link> */}
              <Link to="/playlist">
                <button className="focus:outline-none my-3 flex flex-col justify-center items-center">
                  <img src="/playlist.png" style={{ height: 28, width: 28 }} />
                  <span className="text-sm font-semibold">Koleksi Kamu</span>
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

export default Search;
