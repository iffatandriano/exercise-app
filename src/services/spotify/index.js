import axios from "axios";

export const getSearchMyAlbums = async ({ access_token, album_search }) => {
  try {
    const { data, status, statusText } = await axios.get(
      `https://api.spotify.com/v1/search?type=album`,
      {
        headers: {
          Authorization: { access_token },
          "Content-Type": "application/json",
        },
      }
    );

    return { data, status, statusText };
  } catch (error) {
    if (error.response === undefined) {
      console.log(error);
    } else {
      console.log(error);
    }
  }
};
