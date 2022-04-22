import { url_spotify } from "../../lib/axios";

import { errors } from "../../utils/constants";

/**
 * @description get last current profile playlist
 */

export const getCurrentPlaylistProfile = async (access_token, user_id) => {
  try {
    const { data, status, statusText } = await url_spotify.get(
      `/users/${user_id}/playlists`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
        params: {
          limit: 8,
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
