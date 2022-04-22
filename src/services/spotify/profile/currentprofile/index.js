import { url_spotify } from "../../../../lib/axios";
import { errors } from "../../../../utils/constants";

/**
 * @description get current profile
 */

export const getCurrentProfile = async (token) => {
  try {
    const { data, status, statusText } = await url_spotify.get("/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

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
