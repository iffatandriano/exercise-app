import { createStore } from "redux";
import { accountReducers } from "./reducers/accountReducer";

const store = createStore(accountReducers, { access_token: "" });

export default store;
