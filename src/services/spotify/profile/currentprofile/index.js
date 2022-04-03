// import { url_spotify } from "../../../../lib/axios";
import axios from "axios";

/**
 * @description get current profile
 */

export const getCurrentProfile = async ({ token }) => {
  try {
    const { data, status, statusText } = await axios.get(
      "http://api.spotify.com/v1/me",
      {
        headers: {
          Authorization: `Bearer ${token}`,
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
