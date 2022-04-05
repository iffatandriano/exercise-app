import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App";
import Homes from "./pages/homes";
import Login from "./pages/login";
// import Search from "./pages/search";
import { getTokenFromResponse } from "./utils/spotify";

// redux action
import { myAccessToken } from "./middleware/store/action";

function App() {
  const [token, setToken] = useState(null);
  const dispatch = useDispatch();
  const access_token = useSelector((state) => state.token);
  console.log("token masuk ke redux", access_token);

  const getMyToken = () => {
    const hash = getTokenFromResponse();
    window.location.hash = "";
    let _token = hash.access_token;

    if (_token) {
      setToken(_token);
      dispatch(myAccessToken(_token));
      localStorage.setItem("token", _token);
    }

    setTimeout(() => {
      localStorage.removeItem("token");
      dispatch(myAccessToken(""));
    }, 3600000);
  };

  useEffect(() => {
    getMyToken();
  }, [token]);

  return (
    <div className="App">
      {!access_token && <Login />}
      {access_token && (
        // <Search token={localStorage.getItem("token")} />
        <Homes access_token={access_token} />
      )}
    </div>
  );
}

export default App;
