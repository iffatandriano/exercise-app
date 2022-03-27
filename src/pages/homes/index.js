import React from "react";
// import { getMyPlaylist } from "../../services/git";
import moment from "moment";
import "./index.css";
import Images from "../../components/Track/ImagesComponent";
import Album from "../../components/Track/AlbumComponent";
import Artist from "../../components/Track/ArtistComponent";
import dataSpotify from "../../utils/data";

function Home() {
  // useEffect(() => {
  //   getDataPlaylist();
  // }, []);
  // const [playlist, setPlaylist] = useState([]);
  // const getDataPlaylist = async () => {
  //   try {
  //     const { data, status, statusText } = await getMyPlaylist();

  //     if (status !== 200) {
  //       console.log(statusText);
  //     } else {
  //       const arr = [];
  //       arr.push(data);
  //       setPlaylist(arr);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <div className="container-footer">
      <h1 className="albums-playlist">My Albums Playlist</h1>
      <div className="albums-track" id="albums-track">
        {dataSpotify.map((playlist) => (
          <div className="playlist">
            <Images
              className="pl_image"
              urlImage={playlist.album.images[1].url}
            />
            <div className="description-playlist">
              <Album className="title-album" children="ALBUM" />
              <Album className="title-song" children={playlist.album.name} />
              <div className="album-description">
                <Artist
                  className="artist-name"
                  children={playlist.artists[0].name}
                />
                <Artist className="artist-year">
                  &#8226; {moment(playlist.album.release_date).format("YYYY")}{" "}
                  &#8226;
                </Artist>
                <Artist className="artist-song">
                  {playlist.album.total_tracks} songs,
                </Artist>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
