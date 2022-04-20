import { url_spotify } from "../../lib/axios";
import { errors } from "../../utils/constants";

/**
 * @description get data from search the data.
 */

export const getSearchData = async (access_token, search) => {
  try {
    const { data, status, statusText } = await url_spotify.get("/search", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      params: {
        q: search,
        type: "track",
        limit: 5,
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
