import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

export default function DeleteDialog({ type, open, handleClose, handleDelete }) {
  return (
    <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Are You Sure?</DialogTitle>
        <DialogContent>
            <DialogContentText>
                Deleting your {type} will delete all of the content and anything connected to it forever.
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose} variant="outlined">Cancel</Button>
            <Button onClick={handleDelete} variant="contained" color="error">Confirm</Button>
        </DialogActions>
    </Dialog>
  )
}