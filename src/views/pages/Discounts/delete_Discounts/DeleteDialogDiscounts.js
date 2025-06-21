import React from 'react'
import './DeleteDiscountsDialog.css'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material'
import axios from 'axios'
import { toast } from 'react-toastify'

const DeleteDiscountDialog = ({ open, onClose, onConfirm, Discount }) => {
  const handleDelete = async () => {
    try {
      const token = sessionStorage.getItem('token')

      const response = await axios.delete(`http://test.smartsto0re.shop/api/Discounts/${Discount.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      toast.success('Discount deleted successfully')
      onConfirm(Discount.id)
      onClose()
    } catch (error) {
      console.error('❌ Error deleting Discount:', error)
      toast.error('Failed to delete Discount')
    }
  }

  return (
    <Dialog open={open} onClose={onClose} className="delete-dialog">
      <DialogTitle>Confirm Deletion</DialogTitle>
      <DialogContent>
        Are you sure you want to delete <strong>{Discount?.name || 'this Discount'}</strong>?
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

export default DeleteDiscountDialog
