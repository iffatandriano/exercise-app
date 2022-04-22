import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner";
import MainContent from "../../components/MainContent";

// utils
import { getTokenFromResponse } from "../../utils/spotify";

// redux
import { myAccessToken } from "../../middleware/store/action";
import { useDispatch, useSelector } from "react-redux";

// prop-types
import PropTypes from "prop-types";
import { getAlbumRelease } from "../../services/homes/AlbumRelease";
import AlbumsTrack from "../../components/homes/AlbumsTrack";

function Homes() {
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();
  const [newAlbumRelease, setNewAlbumRelease] = useState([]);

  const [token, setToken] = useState(null);
  const dispatch = useDispatch();
  const access_token = useSelector((state) => state.token);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, [isLoading]);

  useEffect(() => {
    getMyToken();
  }, [token, access_token]);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      history.push("/login");
    } else {
      getNewAlbumRelease();
    }
  }, []);

  const getMyToken = () => {
    const hash = getTokenFromResponse();
    window.location.hash = "";
    let _token = hash.access_token;

    if (_token) {
      setToken(_token);
      localStorage.setItem("token", _token);
      dispatch(myAccessToken(_token));
    }

    setTimeout(() => {
      localStorage.removeItem("token");
      dispatch(myAccessToken(""));
    }, 3600000);
  };

  const getNewAlbumRelease = async () => {
    try {
      const my_token = localStorage.getItem("token");
      // const my_token = access_token;
      const { data, status, statusText } = await getAlbumRelease(my_token);

      let new_album = data.albums.items;

      if (status !== 200) {
        console.error(statusText);
      } else {
        setNewAlbumRelease(new_album);
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
            <div className="flex flex-col px-4 py-4 min-h-screen">
              <h1 className="font-semibold text-base">Album baru rilis</h1>
              <div className="mt-2 grid grid-cols-3 w-full">
                {newAlbumRelease.map((new_albums) => (
                  <AlbumsTrack
                    key={new_albums.id}
                    new_albums={new_albums.id}
                    images_url={new_albums.images[1].url}
                    type_album={new_albums.album_type}
                    albums_name={new_albums.name}
                  />
                ))}
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
                <button className="focus:outline-none my-3 flex flex-col justify-center items-center">
                  <img src="/home.png" style={{ height: 28, width: 28 }} />
                  <span className="font-semibold text-sm">Home</span>
                </button>
              </Link>
              {/* <Link to="/search">
                <button className="focus:outline-none flex flex-col justify-center items-center">
                  <img src="/search.png" style={{ height: 28, width: 28 }} />
                  <span className="text-sm text-abu">Cari</span>
                </button>
              </Link> */}
              <Link to="/playlist">
                <button className="focus:outline-none flex flex-col justify-center items-center">
                  <img src="/playlist.png" style={{ height: 28, width: 28 }} />
                  <span className="text-sm text-abu">Koleksi Kamu</span>
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

export default Homes;
