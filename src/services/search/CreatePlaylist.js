import { url_spotify } from "../../lib/axios";
import { errors } from "../../utils/constants";

/**
 * @description post to create a playlist
 */

export const createNewPlaylist = async (
  data_playlist,
  access_token,
  user_id
) => {
  try {
    const { data, status, statusText } = await url_spotify.post(
      `/users/${user_id}/playlists`,
      data_playlist,
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

export const inputTrackToPlaylist = async (
  track_uri,
  access_token,
  playlist_id
) => {
  try {
    const { data, status, statusText } = await url_spotify.post(
      `/playlists/${playlist_id}/tracks`,
      track_uri,
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
