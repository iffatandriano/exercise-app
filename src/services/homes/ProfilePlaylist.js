import { url_spotify } from "../../lib/axios";
import { errors } from "../../utils/constants";

/**
 * @description get all playlist from profile users
 */

export const getProfilePlaylist = async (access_token, user_id) => {
  try {
    const { data, status, statusText } = await url_spotify.get(
      `/users/${user_id}/playlists`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
        params: {
          limit: 3,
        },
      }
    );

    return { data, status, statusText };
  } catch (error) {
    if (error.response === undefined) {
      return errors.internalServerError;
    } else {
      const { status, message } = error.response.data.error;
      if ((status, message)) return { status: status, statusText: message };
    }
  }
};

export const getProfilePlaylistAll = async (access_token, user_id) => {
  try {
    const { data, status, statusText } = await url_spotify.get(
      `/users/${user_id}/playlists`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    return { data, status, statusText };
  } catch (error) {
    if (error.response === undefined) {
      return errors.internalServerError;
    } else {
      const { status, message } = error.response.data.error;
      if ((status, message)) return { status: status, statusText: message };
    }
  }
};
