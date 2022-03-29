import axios from "axios";
import React, { Component } from "react";
import Playlist from "../playlist";
import "./index.css";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlist: [],
      token: this.props.token,
      searchKey: "",
      errors: "",
      checkInPlaylist: 0,
    };
  }

  searchArtist = async (e) => {
    e.preventDefault();
    this.setState({ checkInPlaylist: 0 });
    const { searchKey } = this.state;
    const token = localStorage.getItem("token");
    const { data, status, statusText } = await axios.get(
      "https://api.spotify.com/v1/search",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          q: searchKey,
          type: "album",
          limit: 6,
        },
      }
    );

    var playlist = data;
    if (status !== 200) {
      let errors = statusText;
      this.setState({ errors, checkInPlaylist: 0 });
    }
    // console.log(playlist);
    this.setState({ playlist: playlist, checkInPlaylist: 1 });
  };

  render() {
    const { playlist, checkInPlaylist } = this.state;
    // console.log(playlist);
    return (
      <div className="container">
        <span className="search-title">FIND YOUR ALBUM ON SPOTIFY</span>
        <div className="form-playlist">
          <form onSubmit={this.searchArtist}>
            <input
              type="text"
              className="input-playlist"
              placeholder="Typing album names"
              onChange={(e) => this.setState({ searchKey: e.target.value })}
            />
            <button className="search-playlist" type="submit">
              Search
            </button>
          </form>
        </div>
        <div className="albums">
          {checkInPlaylist > 0 && <Playlist playlist={playlist} />}
        </div>
      </div>
    );
  }
}

export default Search;
