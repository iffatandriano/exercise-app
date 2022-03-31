import React from "react";
// import { getMyPlaylist } from "../../services/git";
import moment from "moment";
import "./index.css";
import Images from "../../components/Track/ImagesComponent";
import Album from "../../components/Track/AlbumComponent";
import Artist from "../../components/Track/ArtistComponent";
// import dataSpotify from "../../utils/data";

const Playlist = ({ key, plId, pl, selectedHandle, selectedItems }) => {
  return (
    <div className="container-footer">
      {/* {console.log(pl.id)} */}
      <div className="albums-track" id="albums-track">
        {pl !== undefined && (
          <>
            <div className="playlist">
              <Images className="pl_image" urlImage={pl.images[1].url} />
              <div className="description-playlist">
                <Album className="title-album" children="ALBUM" />
                <Album className="title-song" children={pl.name} />
                <div className="album-description">
                  <Artist
                    className="artist-name"
                    children={pl.artists[0].name}
                  />
                  <Artist className="artist-year">
                    &#8226; {moment(pl.release_date).format("YYYY")} &#8226;
                  </Artist>
                  <Artist className="artist-song">
                    {pl.total_tracks} songs,
                  </Artist>
                </div>
                {/* {console.log(selectButton)} */}
                <button
                  className={
                    pl.isSelected ? "button-unselected" : "button-select"
                  }
                  onClick={
                    pl.isSelected
                      ? () => selectedHandle(false, plId)
                      : () => selectedHandle(true, plId)
                  }
                >
                  {pl.isSelected ? "UNSELECT" : "SELECT"}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Playlist;
