import React, { useEffect, useState } from "react";
import {
  // ChevronDownIcon,
  //   PlusIcon,
  //   SearchIcon,
  //   TrashIcon,
  MusicNoteIcon,
} from "@heroicons/react/outline";
// import { url_spotify } from "../../../lib/axios";
import SearchPlaylist from "../../../components/homes/content/playlist/search-playlist";
import DialogChangeDetails from "../../../components/homes/content/playlist/DialogChange";
import { url_spotify } from "../../../lib/axios";
import TrackPlaylist from "../../../components/homes/content/playlist/TrackPlaylist";
import Profile from "../../../components/homes/content/profile";
import Login from "../../login";
// import millisToMinutesAndSeconds from "../../../utils/millisToMinutesAndSeconds";

function CreatePlaylist({
  user_id,
  profile_name,
  images_url,
  new_playlist,
  getLastPlaylist,
  getPlaylistTrack,
  listTrack,
  isLoading,
  setIsLoading,
  getUsersPlaylist,
}) {
  const [openDialog, setOpenDialog] = useState(false);
  const [namePlaylist, setNamePlaylist] = useState("");
  const [descriptionPlaylist, setDescriptionPlaylist] = useState("");
  //   const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      <Login />;
    }
  }, []);

  const handleDialogOpen = () => {
    setOpenDialog(true);
    setNamePlaylist(new_playlist.name);
    setDescriptionPlaylist(new_playlist.description);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleSaveDetails = async (name_playlist, description_playlist) => {
    try {
      let data_playlist = {
        name: name_playlist,
        description: description_playlist,
        public: false,
      };
      let playlist_id = new_playlist.id;
      //   console.log(playlist_id);
      let token = localStorage.getItem("token");
      const response = await url_spotify.put(
        `/playlists/${playlist_id}`,
        data_playlist,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      handleDialogClose();
      getLastPlaylist();
      getPlaylistTrack();
      getUsersPlaylist();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="flex-grow">
      <header className="absolute top-5 right-8">
        <Profile images_url={images_url} profile_name={profile_name} />
      </header>
      <section
        className={`flex items-end space-x-7 bg-gradient-to-b to-black from-blue-500 h-80 text-white p-8`}
      >
        {/* <img className="h-44 w-44 shadow-2xl" src="" alt="" /> */}
        <MusicNoteIcon className="h-44 w-44 shadow-2xl" />
        <div>
          <span className="text-sm font-light">PLAYLIST</span>
          <button className="flex flex-col" onClick={handleDialogOpen}>
            <h1 className="text-2xl md:text-1xl xl:text-5xl font-bold">
              {new_playlist.name}
            </h1>
            <p className="text-gray-400 mt-4">{new_playlist.description}</p>
          </button>
          <p className="text-md">{new_playlist.owner.display_name}</p>
        </div>
      </section>
      {isLoading ? (
        <>
          <div className="text-white flex justify-center items-center">
            <div class="flex justify-center items-center">
              <div
                class="spinner-grow inline-block w-8 h-8 bg-current rounded-full opacity-0 text-blue-600"
                role="status"
              >
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <TrackPlaylist
          getPlaylistTrack={getPlaylistTrack}
          listTrack={listTrack}
        />
      )}
      <SearchPlaylist
        user_id={user_id}
        playlist_id={new_playlist.id}
        getLastPlaylist={getLastPlaylist}
        new_playlist={new_playlist}
        getPlaylistTrack={getPlaylistTrack}
        listTrack={listTrack}
      />
      <DialogChangeDetails
        handleDialogOpen={handleDialogOpen}
        openDialog={openDialog}
        handleDialogClose={handleDialogClose}
        name_playlist={namePlaylist}
        description_playlist={descriptionPlaylist}
        handleSaveDetails={(name_playlist, description_playlist) =>
          handleSaveDetails(name_playlist, description_playlist)
        }
        setNamePlaylist={setNamePlaylist}
        setDescriptionPlaylist={setDescriptionPlaylist}
      />
    </div>
  );
}

export default CreatePlaylist;
