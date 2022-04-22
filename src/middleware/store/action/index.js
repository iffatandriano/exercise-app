export const myAccessToken = (token) => ({
  type: "access_token",
  payload: token,
});

export const newPlaylist = (playlist) => ({
  type: "new_playlist",
  payload: playlist,
});

export const setMyUserId = (user_id) => ({
  type: "user_id",
  payload: user_id,
});
