import React, { useState, useEffect } from "react";
import "./App";
import Homes from "./pages/homes";
import Login from "./pages/login";
// import Search from "./pages/search";
import { getTokenFromResponse } from "./utils/spotify";

function App() {
  const [token, setToken] = useState(null);

  const getMyToken = () => {
    const hash = getTokenFromResponse();
    window.location.hash = "";
    let _token = hash.access_token;

    if (_token) {
      setToken(_token);
      localStorage.setItem("token", _token);
    }

    setTimeout(() => {
      localStorage.removeItem("token");
    }, 3600000);

    console.log("My Token", token);
  };

  useEffect(() => {
    getMyToken();
  }, [token]);

  return (
    <div className="App">
      {!localStorage.getItem("token") && <Login />}
      {localStorage.getItem("token") && (
        // <Search token={localStorage.getItem("token")} />
        <Homes access_token={token} />
      )}
    </div>
  );
}

export default App;
