import React, { useEffect, useState } from "react";
import { useHistory, Link, withRouter } from "react-router-dom";
import Profile from "../../components/homes/content/profile";
import Sidebar from "../../components/homes/sidebar";
import { url_spotify } from "../../lib/axios";
import CreatePlaylist from "./playlist/create-playlist";
import PropTypes from "prop-types";

// spotify
import { myAccessToken } from "../../middleware/store/action";
import { getTokenFromResponse } from "../../utils/spotify";
import { useDispatch, useSelector } from "react-redux";

function Homes() {
  const [sidebarClick, setSidebarClick] = useState("homes");
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [newPlaylist, setNewPlaylist] = useState({});
  const [listTrack, setListTrack] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [listPlaylist, setListPlaylist] = useState([]);
  const history = useHistory();

  const [token, setToken] = useState(null);
  const dispatch = useDispatch();
  const access_token = useSelector((state) => state.token);

  const getMyToken = () => {
    const hash = getTokenFromResponse();
    window.location.hash = "";
    let _token = hash.access_token;

    if (_token) {
      setToken(_token);
      dispatch(myAccessToken(_token));
      localStorage.setItem("token", _token);
    }

    setTimeout(() => {
      localStorage.removeItem("token");
      dispatch(myAccessToken(""));
    }, 3600000);
  };

  useEffect(() => {
    getMyToken();
  }, [token, access_token]);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      history.push("/login");
    } else {
      getMyToken();
      getCurrentProfile();
      getUsersPlaylist();
      getPlaylistTrack();
    }
  }, [access_token]);

  const sidebarClickHandle = (e, value) => {
    e.preventDefault();
    setSidebarClick(value);
    history.push("/");
  };

  const getCurrentProfile = async () => {
    try {
      // const my_token = localStorage.getItem("token");
      // const token = localStorage.getItem("token");
      const { data, status, statusText } = await url_spotify.get("/me", {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      let profile = data;

      if (status !== 200) {
        console.error(statusText);
      } else {
        setUserId(profile.id);
        setUserName(profile.display_name);
        setImageUrl(profile.images[0].url);
        getPlaylistTrack();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const createPlaylist = async (e) => {
    try {
      e.preventDefault();
      // const token = localStorage.getItem("token");
      let data_playlist = {
        name: "New Playlist",
        description: "New playlist description",
        public: false,
      };
      // console.log(token);
      const { data, status, statusText } = await url_spotify.post(
        `/users/${userId}/playlists`,
        data_playlist,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      let new_playlist = data;

      // console.log(new_playlist);
      setNewPlaylist(new_playlist);

      if (status !== 201) {
        console.error(statusText);
      } else {
        setNewPlaylist(new_playlist);
        setSidebarClick("new_playlist");
        getUsersPlaylist();
        // console.log(history);
        // history.push("/create-playlist");
        // console.log(history);
        // history.replace(`/create-playlist/${playlist_id}`);
        // this.props.history.push(`/create-playlist/${new_playlist.id}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getUsersPlaylist = async () => {
    try {
      // const token = localStorage.getItem("token");

      const { data, status, statusText } = await url_spotify.get(
        `/users/${userId}/playlists`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      let list_playlist = data.items;

      // console.log(status);

      if (status !== 200) {
        console.error(statusText);
      } else {
        setListPlaylist(list_playlist);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getLastPlaylist = async () => {
    try {
      let playlist_id = newPlaylist.id;
      // const token = localStorage.getItem("token");

      const { data, status, statusText } = await url_spotify.get(
        `/playlists/${playlist_id}`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      if (status !== 200) {
        console.error(statusText);
      } else {
        setNewPlaylist(data);
        setIsLoading(true);
        getUsersPlaylist();
        setTimeout(() => {
          setIsLoading(false);
        }, 4000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getPlaylistTrack = async () => {
    try {
      let playlist_id = newPlaylist.id;
      // let token = localStorage.getItem("token");

      const { data, status, statusText } = await url_spotify.get(
        `/playlists/${playlist_id}/tracks`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      if (status !== 200) {
        console.error(statusText);
      } else {
        setListTrack(data.items);
      }
    } catch (error) {
      if (error.response === undefined) {
        console.error(error);
      } else {
        console.error(error);
      }
    }
  };
  return (
    <div className="bg-black h-screen overflow-x-auto scrollbar-hide">
      <main className="flex">
        <Sidebar
          sidebarClickHandle={(e, value) => sidebarClickHandle(e, value)}
          createPlaylist={(e) => createPlaylist(e)}
          list_playlist={listPlaylist}
        />
        {sidebarClick === "homes" && (
          <div className="flex flex-grow">
            <header className="absolute top-5 right-8">
              <Profile images_url={imageUrl} profile_name={userName} />
            </header>
            <div className="flex items-center justify-center">
              <p className="text-white ml-auto">Welcome...</p>
            </div>
          </div>
        )}
        {sidebarClick === "new_playlist" && (
          <CreatePlaylist
            user_id={userId}
            profile_name={userName}
            images_url={imageUrl}
            new_playlist={newPlaylist}
            getLastPlaylist={getLastPlaylist}
            getPlaylistTrack={getPlaylistTrack}
            listTrack={listTrack}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            getUsersPlaylist={getUsersPlaylist}
          />
        )}
      </main>
    </div>
  );
}

Homes.propTypes = {
  history: PropTypes.object.isRequired,
};

export default withRouter(Homes);
