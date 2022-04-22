import { createStore } from "redux";
import { accountReducers } from "./reducers/accountReducer";

const store = createStore(accountReducers, {
  access_token: "",
  playlist: [],
  user_id: "",
});

export default store;
