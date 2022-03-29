import React from "react";
import "./index.css";
import { accessUrl } from "../../utils/spotify";

function Login() {
  return (
    <div className="login">
      <img
        src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
        alt=""
      />
      <a href={accessUrl}>Login with Spotify</a>
    </div>
  );
}

export default Login;
