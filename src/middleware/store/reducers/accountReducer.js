export const accountReducers = (state, action) => {
  switch (action.type) {
    case "access_token":
      return {
        token: action.payload,
      };
    case "new_playlist":
      return {
        playlist: action.payload,
      };
    case "user_id":
      return {
        user_id: action.payload,
      };
    default:
      return state;
  }
};
