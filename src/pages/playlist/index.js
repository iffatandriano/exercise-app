import React from "react";
// import { getMyPlaylist } from "../../services/git";
import moment from "moment";
import "./index.css";
import Images from "../../components/Track/ImagesComponent";
import Album from "../../components/Track/AlbumComponent";
import Artist from "../../components/Track/ArtistComponent";
// import dataSpotify from "../../utils/data";

function Playlist({ playlist }) {
  return (
    <div className="container-footer">
      <div className="albums-track" id="albums-track">
        {playlist.albums.items !== undefined &&
          playlist.albums.items.map((playlist, index) => (
            <div className="playlist" key={index}>
              <Images className="pl_image" urlImage={playlist.images[1].url} />
              <div className="description-playlist">
                <Album className="title-album" children="ALBUM" />
                <Album className="title-song" children={playlist.name} />
                <div className="album-description">
                  <Artist
                    className="artist-name"
                    children={playlist.artists[0].name}
                  />
                  <Artist className="artist-year">
                    &#8226; {moment(playlist.release_date).format("YYYY")}{" "}
                    &#8226;
                  </Artist>
                  <Artist className="artist-song">
                    {playlist.total_tracks} songs,
                  </Artist>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Playlist;
