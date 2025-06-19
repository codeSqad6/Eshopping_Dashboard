import React from 'react'
import './DeleteSubCategoriesDialog.css'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material'
import axios from 'axios'
import { toast } from 'react-toastify'

const DeletesubCatDialog = ({ open, onClose, onConfirm, subCat }) => {
  const handleDelete = async () => {
    try {
      const token = sessionStorage.getItem('token')

      const response = await axios.delete(`http://test.smartsto0re.shop/api/SubCategories/${subCat.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      toast.success('subCat deleted successfully')
      onConfirm(subCat.id) 
      onClose()
    } catch (error) {
      console.error('❌ Error deleting subCat:', error)
      toast.error('Failed to delete subCat')
    }
  }

  return (
    <Dialog open={open} onClose={onClose} className="delete-dialog">
      <DialogTitle>Confirm Deletion</DialogTitle>
      <DialogContent>
        Are you sure you want to delete <strong>{subCat?.name || 'this subCat'}</strong>?
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

export default DeletesubCatDialog
