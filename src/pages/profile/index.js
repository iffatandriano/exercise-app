import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

// loading
import LoadingSpinner from "../../components/LoadingSpinner";

// components
import MainContent from "../../components/MainContent";

// icons
import LogoutIcon from "@mui/icons-material/Logout";
import { MusicNoteIcon } from "@heroicons/react/outline";

// services
import {
  getCurrentProfile,
  getProfileFollowing,
} from "../../services/homes/CurrentProfile";
import { getProfilePlaylist } from "../../services/homes/ProfilePlaylist";

function Profile() {
  const [isLoading, setIsLoading] = useState(true);
  const [myProfile, setMyProfile] = useState({});
  const [myFollowingProfile, setMyFollowingProfile] = useState(0);
  const [profilePlaylist, setProfilePlaylist] = useState([]);
  // history
  const history = useHistory();

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, [isLoading]);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      history.push("/login");
    } else {
      handleCurrentProfile();
      handleProfileFollowing();
    }
  }, []);

  const handleCurrentProfile = async () => {
    try {
      let my_token = localStorage.getItem("token");
      const { data, status, statusText } = await getCurrentProfile(my_token);
      //   console.log(data);

      let profile = data;
      let profile_id = data.id;

      if (status !== 200) {
        console.error(statusText);
      } else {
        setMyProfile(profile);
        handleProfilePlaylist(profile_id);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleProfileFollowing = async () => {
    try {
      let my_token = localStorage.getItem("token");
      const { data, status, statusText } = await getProfileFollowing(my_token);

      let my_following = data.artists.total;

      if (status !== 200) {
        console.error(statusText);
      } else {
        setMyFollowingProfile(my_following);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleProfilePlaylist = async (user_id) => {
    try {
      let my_token = localStorage.getItem("token");
      let my_id = user_id;
      const { data, status, statusText } = await getProfilePlaylist(
        my_token,
        my_id
      );

      let my_profile_playlist = data.items;
      //   console.log(my_profile_playlist);
      if (status !== 200) {
        console.error(statusText);
      } else {
        setProfilePlaylist(my_profile_playlist);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogOut = () => {
    localStorage.removeItem("token");
    history.push("/login");
  };

  return (
    <MainContent>
      <div className="flex flex-col">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            <div className="w-full py-4 px-4">
              <div className="flex flex-col items-center justify-center">
                <img
                  src={myProfile.images[0].url}
                  alt="profile-img"
                  className="rounded-full w-32 h-32 object-cover object-center"
                />
                <h1 className="mt-2 font-semibold text-lg">
                  {myProfile.display_name}
                </h1>
                <div className="grid grid-cols-2 grid-flow-col gap-10 mt-4">
                  <div className="flex flex-col">
                    <span className="font-semibold self-center ">
                      {myProfile.followers.total}
                    </span>
                    <span className="text-slate-600">PENGIKUT</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold self-center">
                      {myFollowingProfile}
                    </span>
                    <span className="text-slate-600">MENGIKUTI</span>
                  </div>
                </div>
                <h1 className="font-semibold mt-4">Playlist</h1>
              </div>
              {profilePlaylist.map((profile_playlist) => (
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
              <div className="mt-4">
                {/* <Link
                  to={`/profile/playlist/${myProfile.id}`}
                  className="font-semibold text-md"
                >
                  Lihat ke-11 playlist
                </Link> */}
              </div>
              <div className="flex justify-center">
                <button
                  className="mt-2 rounded bg-blue-800 px-2 py-2 w-full text-white"
                  onClick={handleLogOut}
                >
                  <LogoutIcon />
                  <span>Log Out</span>
                </button>
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

export default Profile;
