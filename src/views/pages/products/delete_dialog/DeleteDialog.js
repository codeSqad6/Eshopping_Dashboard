import React from 'react'
import './DeleteConfirmDialog.css'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material'

const DeleteConfirmDialog = ({ open, onClose, onConfirm, product }) => {
  return (
    <Dialog open={open} onClose={onClose} className="delete-dialog">
      <DialogTitle>Confirm Deletion</DialogTitle>
      <DialogContent>
        Are you sure you want to delete <strong>{product?.name || 'this product'}</strong>?
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button onClick={onConfirm} color="error" variant="contained">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteConfirmDialog
