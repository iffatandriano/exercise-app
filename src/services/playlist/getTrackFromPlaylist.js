import { url_spotify } from "../../lib/axios";
import { errors } from "../../utils/constants";

/**
 * @description get track from playlist
 */

export const getMyTrackPlaylist = async (access_token, playlist_id) => {
  try {
    const { data, status, statusText } = await url_spotify.get(
      `/playlists/${playlist_id}/tracks`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
        params: {
          limit: 5,
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
