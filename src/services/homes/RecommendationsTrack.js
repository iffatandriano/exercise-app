import { url_spotify } from "../../lib/axios";
import { errors } from "../../utils/constants";

/**
 * @description reccomendation track
 */

export const getRecommendationTrack = async (access_token) => {
  try {
    const { data, status, statusText } = await url_spotify.get(
      "/recommendations",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
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
