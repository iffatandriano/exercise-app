import axios from "axios";

export const getMyPlaylist = async () => {
  try {
    const { data, status, statusText } = await axios.get(
      "https://gist.githubusercontent.com/aryapradipta9/e6492383477803b233916e01f36d5465/raw/66942c739d66d3774303f84071696aa865a07077/single-sample.json",
      { headers: { "Content-Type": "application/json" } }
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
