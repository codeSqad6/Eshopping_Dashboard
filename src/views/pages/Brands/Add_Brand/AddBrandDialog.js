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
const API_url = 'http://test.smartsto0re.shop/api/Products?'
const AddBrandDialog = ({ open, onClose, onSave, initialData }) => {
  const [Brand, setBrand] = useState({
    nameEn: '',
    nameAr: '',
    descriptionEn: '',
    descriptionAr: '',
    status: '',
  })

  useEffect(() => {
    if (initialData) {
      setBrand({
        id: initialData.id || '',
        nameEn: initialData.name || '',
        nameAr: initialData.nameAr || '',
        descriptionEn: initialData.description || '',
        descriptionAr: initialData.descriptionAr || '',
        status: initialData.isActive ? 'true' : 'false',
        image: null,
      })
    }
  }, [initialData])

  const handleChange = (e) => {
    const { name, value, type, files } = e.target

    setBrand((prev) => ({
      ...prev,
      [name]: type === 'file' ? files[0] : value,
    }))
  }

  const handleSubmit = async () => {
    if (Brand.nameEn) {
      try {
        const token = sessionStorage.getItem('token')

        const formData = new FormData()

        if (Brand.image && Brand.image instanceof File) {
          formData.append('Image', Brand.image)
        } else {
          toast.error('Please upload a valid image')
          return
        }

        formData.append('Name', Brand.nameEn)
        formData.append('NameAr', Brand.nameAr)
        formData.append('Description', Brand.descriptionEn || '')
        formData.append('DescriptionAr', Brand.descriptionAr || '')
        formData.append('IsActive', Brand.status)

        const response = await axios.post(`http://test.smartsto0re.shop/api/Brands`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        })

        toast.success('Brand added successfully!')
        console.log(response.data)
        onSave(response.data)
        onClose()
      } catch (error) {
        console.error('❌ Error Response:', error.response?.data || error.message)
        toast.error('Failed to add brand. Check required fields.')
      }
    } else {
      toast.error('Please fill required fields')
    }
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Brand</DialogTitle>
      <DialogContent>
        <TextField
          label="Brand Name Arabic"
          name="nameAr"
          fullWidth
          margin="dense"
          value={Brand.nameAr}
          onChange={handleChange}
        />
        <TextField
          label="Brand Name English"
          name="nameEn"
          fullWidth
          margin="dense"
          value={Brand.nameEn}
          onChange={handleChange}
        />
        <TextField
          className="mt-4"
          label="Upload Image"
          type="file"
          name="image"
          fullWidth
          margin="dense"
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          label="Description English"
          name="descriptionEn"
          fullWidth
          margin="dense"
          multiline
          rows={4}
          value={Brand.descriptionEn}
          onChange={handleChange}
        />

        <TextField
          label="Description Arabic"
          name="descriptionAr"
          fullWidth
          margin="dense"
          multiline
          rows={4}
          value={Brand.descriptionAr}
          onChange={handleChange}
        />
        <TextField
          select
          label="Select status"
          name="status"
          fullWidth
          margin="normal"
          value={Brand.status}
          onChange={(e) => {
            const value = e.target.value === 'true' ? true : false
            setBrand((prev) => ({ ...prev, status: value }))
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

export default AddBrandDialog
