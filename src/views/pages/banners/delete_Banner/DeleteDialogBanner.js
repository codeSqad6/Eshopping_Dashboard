import React from 'react'
import './DeleteBannerDialog.css'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material'
import axios from 'axios'
import { toast } from 'react-toastify'

const DeleteBannerDialog = ({ open, onClose, onConfirm, Banner }) => {
  const handleDelete = async () => {
    try {
      const token = sessionStorage.getItem('token')

      const response = await axios.delete(`http://test.smartsto0re.shop/api/Banner/${Banner.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      toast.success('Banner deleted successfully')
      onConfirm(Banner.id)
      onClose()
    } catch (error) {
      console.error('❌ Error deleting Banner:', error)
      toast.error('Failed to delete Banner')
    }
  }

  return (
    <Dialog open={open} onClose={onClose} className="delete-dialog">
      <DialogTitle>Confirm Deletion</DialogTitle>
      <DialogContent>
        Are you sure you want to delete <strong>{Banner?.name || 'this Banner'}</strong>?
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button onClick={handleDelete} color="error" variant="contained">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteBannerDialog
