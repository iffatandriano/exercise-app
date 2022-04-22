import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

// loading
import LoadingSpinner from "../../components/LoadingSpinner";

// components
import MainContent from "../../components/MainContent";

// MUI Components
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import { MusicNoteIcon } from "@heroicons/react/outline";

import { useDispatch, useSelector } from "react-redux";
import { getCurrentProfile } from "../../services/spotify/profile/currentprofile";
import { setMyUserId } from "../../middleware/store/action";
import { getCurrentPlaylistProfile } from "../../services/playlist/currentPlaylist";
import DialogCreateContent from "../../components/DialogCreateContent";
import { createNewPlaylist } from "../../services/search/CreatePlaylist";
import LoadingItems from "../../components/LoadingItems";

function Playlist() {
  const [isLoading, setIsLoading] = useState(true);
  const [isItemLoading, setIsItemLoading] = useState(false);
  const [currentPlaylist, setCurrentPlaylist] = useState([]);
  const [descriptionPlaylist, setDescriptionPlaylist] = useState("");
  const [namePlaylist, setNamePlaylist] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const history = useHistory();

  // redux
  const dispatch = useDispatch();
  const user_id = useSelector((state) => state.user_id);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      getProfileId();
    }, 3000);
  }, [isLoading]);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      history.push("/login");
    } else {
      handleGetCurrentPlaylist();
    }
  }, []);

  const getProfileId = async () => {
    try {
      let my_token = localStorage.getItem("token");
      const { data, status, statusText } = await getCurrentProfile(my_token);

      let profile_id = data.id;
      // console.log(profile_id);

      if (status !== 200) {
        console.error(statusText);
      } else {
        dispatch(setMyUserId(profile_id));
        // console.log(user_id);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleGetCurrentPlaylist = async () => {
    try {
      let my_token = localStorage.getItem("token");
      let my_id = user_id;

      const { data, status, statusText } = await getCurrentPlaylistProfile(
        my_token,
        my_id
      );

      let last_playlist = data.items;

      // console.log(last_playlist);

      if (status !== 200) {
        console.error(statusText);
      } else {
        setCurrentPlaylist(last_playlist);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDetailsPlaylist = (playlist_id) => {
    history.push(`/playlist/${playlist_id}`);
  };

  const handleCreatePlaylist = async (e, name, description) => {
    e.preventDefault();

    let my_token = localStorage.getItem("token");

    let data_playlist = {
      name: name,
      description: description,
      public: false,
      collaborative: false,
    };

    const { status, statusText } = await createNewPlaylist(
      data_playlist,
      my_token,
      user_id
    );

    // let myPlaylistId = data;

    if (status !== 201) {
      console.error(statusText);
    } else {
      setNamePlaylist("");
      setDescriptionPlaylist("");
      handleSetCloseDialog();
      setIsItemLoading(true);
      setTimeout(() => {
        setIsItemLoading(false);
        handleGetCurrentPlaylist();
      }, 2000);
    }
  };

  const handleSetOpenDialog = (e) => {
    e.preventDefault();
    setOpenDialog(true);
  };

  const handleSetCloseDialog = () => {
    setOpenDialog(false);
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
                <h1 className="font-semibold text-slate-700 text-2xl">
                  Koleksi Kamu
                </h1>
                <div className="ml-2 mt-0">
                  <button
                    className="bg-blue-500 py-2 px-4 rounded-lg inline-flex items-center ml-2 hover:bg-blue-600 disabled:opacity-25"
                    onClick={(e) => handleSetOpenDialog(e)}
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
              <div className="w-full mt-6 flex flex-col">
                {currentPlaylist.length > 0 ? (
                  currentPlaylist.map((currPlaylist) => (
                    <>
                      {isItemLoading ? (
                        <LoadingItems />
                      ) : (
                        <div
                          key={currPlaylist.id}
                          className="flex flex-row justify-between mt-2"
                        >
                          <div className="flex flex-row">
                            {currPlaylist.images.length > 0 ? (
                              <img
                                src={currPlaylist.images[0].url}
                                alt="image-playlist"
                                style={{ height: "50px", width: "50px" }}
                              />
                            ) : (
                              <MusicNoteIcon
                                style={{ height: "50px", width: "50px" }}
                              />
                            )}
                            <div className="flex flex-col ml-4">
                              <span className="text-lg font-semibold">
                                {currPlaylist.name}
                              </span>
                              <span className="text-sm text-slate-600">
                                {currPlaylist.type} .{" "}
                                {currPlaylist.owner.display_name}
                              </span>
                            </div>
                          </div>
                          <button
                            className="mr-4"
                            onClick={() =>
                              handleDetailsPlaylist(currPlaylist.id)
                            }
                          >
                            <DoubleArrowIcon className="h-5 w-5" />
                          </button>
                        </div>
                      )}
                    </>
                  ))
                ) : (
                  <div>Kosong</div>
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
                <button className="focus:outline-none flex flex-col justify-center items-center">
                  <img src="/search.png" style={{ height: 28, width: 28 }} />
                  <span className="text-abu text-sm">Cari</span>
                </button>
              </Link> */}
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
      <DialogCreateContent
        name_playlist={namePlaylist}
        description_playlist={descriptionPlaylist}
        setNamePlaylist={(e) => setNamePlaylist(e)}
        setDescriptionPlaylist={(e) => setDescriptionPlaylist(e)}
        openDialog={openDialog}
        handleSetCloseDialog={handleSetCloseDialog}
        handleCreatePlaylist={(e, name, description) =>
          handleCreatePlaylist(e, name, description)
        }
      />
    </MainContent>
  );
}

export default Playlist;
