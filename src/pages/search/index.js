import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MainContent from "../../components/MainContent";
import LoadingSpinner from "../../components/LoadingSpinner";

// MUI Components
import { TextField } from "@mui/material";
import { getSearchData } from "../../services/search";

function Search() {
  const [isLoading, setIsLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, [isLoading]);

  const handleSearchTrack = async (e) => {
    try {
      let my_token = localStorage.getItem("token");
      let searchKey = searchValue;

      const { data, status, statusText } = await getSearchData(
        my_token,
        searchKey
      );

      // console.log(my_tracks);
      // if (searchKey === null) {
      //   setSearchValue("");
      //   setTracks([]);
      // }
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
  return (
    <MainContent>
      <div className="flex flex-col">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            <div className="w-full flex flex-col px-4 py-4">
              <h1 className="font-semibold text-slate-700 text-2xl">Cari</h1>
              <div className="mt-4">
                <TextField
                  value={searchValue}
                  placeholder="Judul lagu, album, etc"
                  className="w-full"
                  onChange={(e) =>
                    handleSearchTrack(setSearchValue(e.target.value))
                  }
                />
              </div>
              <div className="w-full mt-6 flex flex-col">
                {tracks.length > 0 ? (
                  tracks.map((my_tracks) => (
                    <div className="flex flex-row mt-2" key={my_tracks.id}>
                      <img
                        src={my_tracks.album.images[1].url}
                        alt="image-track"
                        style={{ height: "70px", width: "70px" }}
                      />
                      <div className="flex flex-col ml-4">
                        <span className="text-lg font-semibold">
                          {my_tracks.name}
                        </span>
                        <span className="text-sm text-slate-600">
                          Album . {my_tracks.artists[0].name}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div></div>
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
              <Link to="/search">
                <button className="focus:outline-none my-3 flex flex-col justify-center items-center">
                  <img src="/search.png" style={{ height: 28, width: 28 }} />
                  <span className="font-semibold text-sm">Cari</span>
                </button>
              </Link>
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

export default Search;
