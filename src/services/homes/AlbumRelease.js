import { url_spotify } from "../../lib/axios";
import { errors } from "../../utils/constants";
/**
 * @description new album release
 */

export const getAlbumRelease = async (access_token) => {
  try {
    const { data, status, statusText } = await url_spotify.get(
      "/browse/new-releases",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
        params: {
          limit: 9,
        },
      }
    );

    return { data, status, statusText };
  } catch (error) {
    if (error.response === undefined) {
      return errors.internalServerError;
    } else {
      const { status, message } = error.response.data.error;
      if (status && message) return { status: status, statusText: message };
    }
  }
};
