import React from "react";

// MUI Components
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import PropTypes from "prop-types";

function DialogCreateContent({
  openDialog,
  name_playlist,
  description_playlist,
  setNamePlaylist,
  setDescriptionPlaylist,
  handleSetCloseDialog,
  handleCreatePlaylist,
}) {
  return (
    <div>
      <Dialog onClose={handleSetCloseDialog} open={openDialog}>
        <DialogTitle>Add Details</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name_playlist"
            type="text"
            fullWidth
            value={name_playlist}
            onChange={(e) => setNamePlaylist(e.target.value)}
            placeholder="playlist name"
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="description_playlist"
            multiline
            rows={5}
            rowsMax={8}
            value={description_playlist}
            fullWidth
            onChange={(e) => setDescriptionPlaylist(e.target.value)}
            placeholder="description playlist"
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSetCloseDialog}>Cancel</Button>
          <Button
            onClick={(e) =>
              handleCreatePlaylist(e, name_playlist, description_playlist)
            }
          >
            Add Playlist
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

DialogCreateContent.propTypes = {
  setNamePlaylist: PropTypes.func,
  setDescriptionPlaylist: PropTypes.func,
  handleSetCloseDialog: PropTypes.func,
  handleCreatePlaylist: PropTypes.func,
  name_playlist: PropTypes.string,
  description_playlist: PropTypes.string,
  openDialog: PropTypes.bool,
};

export default DialogCreateContent;
