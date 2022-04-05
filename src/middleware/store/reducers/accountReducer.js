export const accountReducers = (state, action) => {
  switch (action.type) {
    case "access_token":
      return {
        token: action.payload,
      };
    default:
      return state;
  }
};
