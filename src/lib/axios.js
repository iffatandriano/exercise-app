import axios from "axios";

export const url_spotify = axios.create({
  baseURL: "https://api.spotify.com/v1",
});
