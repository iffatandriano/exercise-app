import React, { useEffect, useState } from "react";
import { getMyPlaylist } from "../../services/git";
import moment from "moment";
import "./index.css";

function Home() {
  useEffect(() => {
    getDataPlaylist();
  }, []);
  const [playlist, setPlaylist] = useState([]);
  const getDataPlaylist = async () => {
    try {
      const { data, status, statusText } = await getMyPlaylist();

      if (status !== 200) {
        console.log(statusText);
      } else {
        const arr = [];
        arr.push(data);
        setPlaylist(arr);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container-footer">
      <h1>My Albums Playlist</h1>
      <div className="albums-track" id="albums-track">
        {playlist.map((playlist) => (
          <div className="playlist">
            <img
              className="pl_image"
              src="https://i.scdn.co/image/ab67616d00001e02e8b066f70c206551210d902b"
              alt=""
            />
            <div className="description-playlist">
              <span className="title-album">ALBUM</span>
              <span className="title-song">{playlist.album.name}</span>
              <div className="album-description">
                <img
                  className="artist-icon"
                  src="https://i.scdn.co/image/6dd0ffd270903d1884edf9058c49f58b03db893d"
                  alt=""
                />
                <span className="artist-name">Queen</span>
                <span className="artist-year">
                  &#8226; {moment(playlist.album.release_date).format("YYYY")}{" "}
                  &#8226;
                </span>
                <span className="artist-song">
                  {playlist.album.total_tracks} songs,
                </span>
                <span className="song-minutes">1 hr 19 min</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
