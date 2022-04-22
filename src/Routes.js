import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Homes from "./pages/homes";
import CreatePlaylist from "./pages/homes/playlist/create-playlist";
// import components

// footer
import Login from "./pages/login";
import Search from "./pages/search";
import Playlist from "./pages/playlist";
import Profile from "./pages/profile";
import ProfilePlaylist from "./pages/profile/playlist";
import PlaylistDetails from "./pages/playlist/details";

function Routes() {
  return (
    <Switch>
      {/** Auth */}
      <Route path="/login" component={Login} exact />
      {/* <Redirect to="/home" from="/#" exact /> */}

      {/** Dashboard */}
      <Route path="/" component={Homes} exact />
      <Route path="/home" component={Homes} exact />
      <Route path="/playlist" component={Playlist} exact />
      <Route path="/playlist/:playlistId" component={PlaylistDetails} exact />
      <Route path="/playlist/:playlistId/search" component={Search} exact />
      <Route path="/profile" component={Profile} exact />
      {/* <Redirect to="/profile" from="/profile/playlist" /> */}
      <Route
        path="/profile/playlist/:userId"
        component={ProfilePlaylist}
        exact
      />
      <Route
        path="/create-playlist"
        component={CreatePlaylist}
        render={(props) => <CreatePlaylist {...props} />}
        exact
      />
      {/* <Route
        path="/create-playlist/:playlistId"
        component={CreatePlaylist}
        exact
      /> */}
    </Switch>
  );
}

export default Routes;
