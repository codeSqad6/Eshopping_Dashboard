import React from 'react'
import './DeleteCatagoryDialog.css'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material'
import axios from 'axios'
import { toast } from 'react-toastify'

const DeleteCatagoryDialog = ({ open, onClose, onConfirm, Catagory }) => {
  console.log(Catagory)

  const handleDelete = async () => {
    try {
      const token = sessionStorage.getItem('token')
      console.log(Catagory.id, 'cgchgchgch')
      console.log('hvjhvchjvhvkhvhjcvhchch')
      const response = await axios.delete(
        `http://test.smartsto0re.shop/api/Categories/${Catagory.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

      toast.success('Brand deleted successfully')
      onConfirm(Catagory.id)
      onClose()
    } catch (error) {
      console.error('❌ Error deleting Catagory:', error)
      toast.error(error)
    }
  }

  return (
    <Dialog open={open} onClose={onClose} className="delete-dialog">
      <DialogTitle>Confirm Deletion</DialogTitle>
      <DialogContent>
        Are you sure you want to delete <strong>{Catagory?.nameEn || 'this Catagory'}</strong>?
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

export default DeleteCatagoryDialog
