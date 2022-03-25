import React, { useEffect, useState } from "react";
import { getMyPlaylist } from "../../services/git";
import moment from "moment";
import "./index.css";
import Images from "../../components/ImagesComponent";
import Album from "../../components/AlbumComponent";
import Artist from "../../components/ArtistComponent";

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
            <Images
              className="pl_image"
              urlImage="https://i.scdn.co/image/ab67616d00001e02e8b066f70c206551210d902b"
            />
            <div className="description-playlist">
              <Album className="title-album" children="ALBUM" />
              <Album className="title-song" children={playlist.album.name} />
              <div className="album-description">
                <Images
                  className="artist-icon"
                  urlImage="https://i.scdn.co/image/6dd0ffd270903d1884edf9058c49f58b03db893d"
                />
                <Artist className="artist-name" children="Queen" />
                <Artist className="artist-year">
                  &#8226; {moment(playlist.album.release_date).format("YYYY")}{" "}
                  &#8226;
                </Artist>
                <Artist className="artist-song">
                  {playlist.album.total_tracks} songs,
                </Artist>
                <Artist className="song-minutes" children="1 hr 19 min" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
