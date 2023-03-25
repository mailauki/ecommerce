import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";

export default function SubmitDialog({ open, handleClose, handleSubmit, name, price, description, selectedCategories, images }) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Ready to Submit?</DialogTitle>

      <DialogContent>
          <DialogContentText 
              sx={{ "span": { color: "text.primary", textTransform: "uppercase" }}}
          >
              <span>Name: </span>
              {name}
          </DialogContentText>

          <DialogContentText 
              sx={{ "span": { color: "text.primary", textTransform: "uppercase" }}}
          >
              <span>Price: </span>
              ${price}
          </DialogContentText>

          <DialogContentText 
              sx={{ "span": { color: "text.primary", textTransform: "uppercase" }}}
          >
              <span>Description: </span>
              {description === "" ? "No Description" : description}
          </DialogContentText>

          <DialogContentText 
              sx={{ "span": { color: "text.primary", textTransform: "uppercase" }}}
          >
              <span>Categories: </span>
          </DialogContentText>
          {selectedCategories.length === 0 ? (
              <ul style={{ margin: 0, listStyle: "none" }}>
                  <li>
                      <DialogContentText>No Categories</DialogContentText>
                  </li>
              </ul>
          ) : (
              <ul style={{ margin: 0, listStyle: "none" }}>
                  {selectedCategories.map((category) => (
                      <li key={category.id || category.name}>
                          <DialogContentText>{category.name}</DialogContentText>
                      </li>
                  ))}
              </ul>
          )}

          <DialogContentText 
              sx={{ "span": { color: "text.primary", textTransform: "uppercase" }}}
          >
              <span>Images: </span>
              {images.length === 0 ? "No Images" : images.length}
          </DialogContentText>
      </DialogContent>

      <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit} autoFocus>Confirm</Button>
      </DialogActions>
    </Dialog>
  )
}