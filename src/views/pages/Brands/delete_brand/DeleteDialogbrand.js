import React from 'react'
import './DeleteBrandDialog.css'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material'
import axios from 'axios'
import { toast } from 'react-toastify'

const DeleteBrandDialog = ({ open, onClose, onConfirm, Brand }) => {
  const handleDelete = async () => {
    try {
      const token = sessionStorage.getItem('token')

      const response = await axios.delete(`http://test.smartsto0re.shop/api/Brands/${Brand.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      toast.success('Brand deleted successfully')
      onConfirm(Brand.id) 
      onClose()
    } catch (error) {
      console.error('❌ Error deleting brand:', error)
      toast.error('Failed to delete brand')
    }
  }

  return (
    <Dialog open={open} onClose={onClose} className="delete-dialog">
      <DialogTitle>Confirm Deletion</DialogTitle>
      <DialogContent>
        Are you sure you want to delete <strong>{Brand?.nameEn || 'this brand'}</strong>?
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

export default DeleteBrandDialog
