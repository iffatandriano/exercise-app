import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import MainContent from "../../components/MainContent";
import LoadingSpinner from "../../components/LoadingSpinner";

// icons
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { MusicNoteIcon } from "@heroicons/react/outline";

// service
import { getProfilePlaylistAll } from "../../services/homes/ProfilePlaylist";

function ProfilePlaylist() {
  const [isLoading, setIsLoading] = useState(true);
  const [profilePlaylistAll, setProfilePlaylistAll] = useState([]);

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
    } else {
      handleProfilePlaylistAll();
    }
  }, []);

  const handleProfilePlaylistAll = async (user_id) => {
    try {
      let my_token = localStorage.getItem("token");
      let my_id = params.user_id;
      // console.log(params);
      const { data, status, statusText } = await getProfilePlaylistAll(
        my_token,
        my_id
      );

      let my_profile_playlist = data.items;
      // console.log(my_profile_playlist);
      if (status !== 200) {
        console.error(statusText);
      } else {
        setProfilePlaylistAll(my_profile_playlist);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <MainContent>
      <div className="flex flex-col">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            <div className="w-full py-2 px-2">
              <div className="flex flex-row justify-between">
                <Link to="/profile">
                  <ArrowBackIcon className="text-lg" />
                </Link>
                <h1 className="font-semibold text-lg">Playlist</h1>
                <div></div>
              </div>
              {profilePlaylistAll.map((profile_playlist) => (
                <div
                  className="w-full mt-4 flex flex-row"
                  key={profile_playlist.id}
                >
                  {profile_playlist.images.length > 0 ? (
                    <img
                      src={profile_playlist.images[0].url}
                      alt="playlist-img"
                      className="h-12 w-12"
                    />
                  ) : (
                    <MusicNoteIcon className="h-12 w-12 border" />
                  )}
                  <div className="flex flex-col ml-2">
                    <h1 className="font-bold">{profile_playlist.name}</h1>
                    <span className="text-slate-600">0 pengikut</span>
                  </div>
                </div>
              ))}
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
              <Link to="/search">
                <button className="focus:outline-none flex flex-col justify-center items-center">
                  <img src="/search.png" style={{ height: 28, width: 28 }} />
                  <span className="text-sm text-abu">Cari</span>
                </button>
              </Link>
              <Link to="/playlist">
                <button className="focus:outline-none flex flex-col justify-center items-center">
                  <img src="/playlist.png" style={{ height: 28, width: 28 }} />
                  <span className="text-sm text-abu">Koleksi Kamu</span>
                </button>
              </Link>
              <Link to="/profile">
                <button className="focus:outline-none my-3 flex flex-col justify-center items-center">
                  <img src="/person.png" style={{ height: 28, width: 28 }} />
                  <span className="text-sm font-semibold">Profil</span>
                </button>
              </Link>
            </div>
          </>
        )}
      </div>
    </MainContent>
  );
}

export default ProfilePlaylist;
