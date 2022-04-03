import React from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

function DialogChangeDetails({
  openDialog,
  handleDialogClose,
  setNamePlaylist,
  setDescriptionPlaylist,
  handleSaveDetails,
  name_playlist,
  description_playlist,
}) {
  return (
    <div>
      <Dialog onClose={handleDialogClose} open={openDialog}>
        <DialogTitle>Edit Details</DialogTitle>
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
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button
            onClick={() =>
              handleSaveDetails(name_playlist, description_playlist)
            }
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DialogChangeDetails;
