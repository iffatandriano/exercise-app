import React, { useEffect } from "react";
import "./index.css";
import { accessUrl } from "../../utils/spotify";
import { useHistory } from "react-router-dom";

function Login() {
  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      history.push("/");
    }
  });
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

// Login.propTypes = {
//   history: PropTypes.object.isRequired,
// };

export default Login;
