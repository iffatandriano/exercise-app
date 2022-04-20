import { url_spotify } from "../../lib/axios";

import { errors } from "../../utils/constants";

/**
 * @description get last current profile & following profile
 */

export const getCurrentProfile = async (access_token) => {
  try {
    const { data, status, statusText } = await url_spotify.get("/me", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
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

export const getProfileFollowing = async (access_token) => {
  try {
    const { data, status, statusText } = await url_spotify.get(
      "/me/following",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
        params: {
          type: "artist",
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
