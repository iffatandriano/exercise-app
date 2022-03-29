import React, { useState } from "react";
import "./App";
import Login from "./pages/login";
import Search from "./pages/search";
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

    console.log("My Token", token);
  };

  return (
    <div className="App">
      {getMyToken()}
      {!localStorage.getItem("token") && <Login />}
      {localStorage.getItem("token") && <Search token={token} />}
    </div>
  );
}

export default App;
