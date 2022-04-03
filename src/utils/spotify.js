export const authEndPoint = "https://accounts.spotify.com/authorize";

const clientId = process.env.REACT_APP_CLIENT_SPOTIFY;
const redirectUri = process.env.REACT_APP_CLIENT_URI_SPOTIFY;
const scopes = [
  "user-read-private",
  "user-read-email",
  "playlist-modify-private",
  "playlist-modify-public",
  "playlist-read-private",
  "playlist-read-collaborative",
  "user-top-read",
  "user-follow-read",
];

export const getTokenFromResponse = () => {
  return window.location.hash
    .substring(1)
    .split("&")
    .reduce((initial, item) => {
      var parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);

      return initial;
    }, {});
};

export const accessUrl = `${authEndPoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`;
