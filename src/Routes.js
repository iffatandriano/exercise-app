import React from "react";
import { Switch, Route } from "react-router-dom";
import Homes from "./pages/homes";
import CreatePlaylist from "./pages/homes/playlist/create-playlist";
// import components
import Login from "./pages/login";

function Routes() {
  return (
    <Switch>
      {/** Auth */}
      <Route path="/login" component={Login} exact />

      {/** Dashboard */}
      <Route path="/" component={Homes} exact />
      <Route path="/create-playlist" component={CreatePlaylist} exact />
    </Switch>
  );
}

export default Routes;
