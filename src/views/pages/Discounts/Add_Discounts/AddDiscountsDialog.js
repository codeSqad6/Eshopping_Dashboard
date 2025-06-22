import React, { useState, useEffect } from 'react'

import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material'
const AddDiscountDialog = ({ open, onClose, onSave, initialData }) => {
  const [Discount, setDiscount] = useState({
    nameEn: '',
    nameAr: '',
    descriptionEn: '',
    descriptionAr: '',
   discountCode: '',
    discountPercentage: '',
    startDate: '',
    endDate: '',
    status: '',
  })

  useEffect(() => {
    if (initialData) {
      setDiscount({
        id: initialData.id || '',
        nameEn: initialData.nameEn || '',
        nameAr: initialData.nameAr || '',
        descriptionEn: initialData.description || '',
        descriptionAr: initialData.descriptionAr || '',
        discountCode : initialData.discountCode  || '',
        discountPercentage: initialData.discountPercentage || '',
        startDate: initialData.startDate || '',
        endDate: initialData.endDate || '',
        status: initialData.isActive ? 'true' : 'false',
      })
    }
  }, [initialData])

const handleChange = (e) => {
  const { name, value, type, files } = e.target;
  if (type === 'file') {
    setDiscount((prev) => ({ ...prev, [name]: files[0] }));
  } else {
    setDiscount((prev) => ({ ...prev, [name]: value }));
  }
};

  const handleSubmit = async () => {
    if (Discount.nameEn) {
      try {
        const token = sessionStorage.getItem('token')

        const formData = new FormData()
        formData.append('Name', Discount.nameEn)
        formData.append('NameAr', Discount.nameAr)
        formData.append('Description', Discount.descriptionEn || '')
        formData.append('DescriptionAr', Discount.descriptionAr || '')
        formData.append('DiscountCode', Discount.discountCode || '')
        formData.append('DiscountPercentage', Discount.discountPercentage || '')
        formData.append('StartDate', Discount.startDate || '')
        formData.append('EndDate', Discount.endDate || '')
        formData.append('IsActive', Discount.status)

        const response = await axios.post(`http://test.smartsto0re.shop/api/Discounts`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        })

        toast.success('Discount added successfully!')
        console.log(response.data)
        onSave(response.data)
        onClose()
      } catch (error) {
        console.error('❌ Error Response:', error.response?.data|| error.message)
        toast.error('Failed to add Discount. Check required fields.')
      }
    } else {
      toast.error('Please fill required fields')
    }
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Discount</DialogTitle>
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
          onChange={(e) => {
            const value = e.target.value === 'true' ? true : false
            setDiscount((prev) => ({ ...prev, status: value }))
          }}
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
          Add
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AddDiscountDialog
