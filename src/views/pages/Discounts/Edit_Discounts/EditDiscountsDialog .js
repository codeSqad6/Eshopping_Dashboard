// components/EditProductDialog.js
import React, { useEffect, useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from '@mui/material'
import { toast } from 'react-toastify'
import axios from 'axios'

const EditDiscountDialog = ({ open, onClose, onSave, initialData }) => {
  const [Discount, setDiscount] = useState({
    nameEn: '',
    nameAr: '',
    descriptionEn: '',
    descriptionAr: '',
  discountCode : '',
    discountPercentage: '',
    startDate: '',
    endDate: '',
    status: 'true',
  })

  useEffect(() => {
    if (open && initialData) {
      setDiscount({
        id: initialData.id,
        nameEn: initialData.name || '',
        nameAr: initialData.name || '',
        descriptionEn: initialData.description || '',
        descriptionAr: initialData.description || '',
         discountCode : initialData.discountCode  || '',
        discountPercentage: initialData.discountPercentage || '',
    startDate: initialData.startDate ? initialData.startDate.substring(0, 10) : '',
      endDate: initialData.endDate ? initialData.endDate.substring(0, 10) : '',
        status: initialData.isActive ? 'true' : 'false',
    
      })
    }
  }, [open, initialData])

  const handleChange = (e) => {
    const { name, value, type, files } = e.target
    if (type === 'file') {
      setDiscount((prev) => ({ ...prev, image: files[0] }))
    } else {
      setDiscount((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async () => {
    if (!Discount.nameEn) {
      toast.error('Please fill required fields')
      return
    }

    try {
      const formData = new FormData()
      formData.append('Name', Discount.nameEn)
      formData.append('NameAr', Discount.nameAr)
      formData.append('Description', Discount.descriptionEn)
      formData.append('DescriptionAr', Discount.descriptionAr)
     formData.append('DiscountCode', Discount.discountCode || '')
        formData.append('DiscountPercentage', Discount.discountPercentage || '')
        formData.append('StartDate', Discount.startDate || '')
        formData.append('EndDate', Discount.endDate || '')
      formData.append('IsActive', Discount.status === 'true')

      const token = sessionStorage.getItem('token')

      const response = await axios.put(`http://test.smartsto0re.shop/api/Discounts/${Discount.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      )

      toast.success('Discount updated successfully')
      onSave?.(response.data)
      onClose()
    } catch (error) {
      console.error(error)
      toast.error('Failed to update Discount')
    }
  }
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit Discount</DialogTitle>
      <DialogContent>
        <TextField
          label="Discount Name Arabic"
          name="nameAr"
          fullWidth
          margin="dense"
          value={Discount.nameAr}
          onChange={handleChange}
        />

        <TextField
          label="Discount Name English"
          name="nameEn"
          fullWidth
          margin="dense"
          value={Discount.nameEn}
          onChange={handleChange}
        />
        <TextField
          label="Description English"
          name="descriptionEn"
          fullWidth
          margin="dense"
          multiline
          rows={4}
          value={Discount.descriptionEn}
          onChange={handleChange}
        />
        <TextField
          label="Description Arabic"
          name="descriptionAr"
          fullWidth
          margin="dense"
          multiline
          rows={4}
          value={Discount.descriptionAr}
          onChange={handleChange}
        />
      <TextField
           label="Discount DiscountCode"
           name="discountCode"
           fullWidth
           margin="dense"
           value={Discount.discountCode}
           onChange={handleChange}
         />
             <TextField
           label="Discount DiscountPercentage"
           name="discountPercentage"
            type="number"
           fullWidth
           margin="dense"
           value={Discount.discountPercentage}
           onChange={handleChange}
         />
         <TextField
   label="Discount Start Date"
   name="startDate"
   type="date"
   fullWidth
   margin="dense"
   value={Discount.startDate}
   onChange={handleChange}
   InputLabelProps={{
     shrink: true, 
   }}
 />
 
 <TextField
   label="Discount End Date"
   name="endDate"
   type="date"
   fullWidth
   margin="dense"
   value={Discount.endDate}
   onChange={handleChange}
   InputLabelProps={{
     shrink: true,
   }}
 />
        <TextField
          select
          label="Select status"
          name="status"
          fullWidth
          margin="normal"
          value={Discount.status}
          onChange={handleChange}
          SelectProps={{ native: true }}
        >
          <option value="">Select status</option>
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default EditDiscountDialog
