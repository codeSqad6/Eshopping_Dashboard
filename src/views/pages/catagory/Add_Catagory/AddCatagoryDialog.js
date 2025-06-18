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
const API_url = 'http://test.smartsto0re.shop/api/Categories/'
const AddCatagoryDialog = ({ open, onClose, onSave, initialData }) => {
  const [Catagory, setCatagory] = useState({
    nameEn: '',
    nameAr: '',
    descriptionEn: '',
    descriptionAr: '',
    status: '',
  })

  useEffect(() => {
    if (initialData) {
      setCatagory({
        id: initialData.id || '',
        nameEn: initialData.nameEn || '',
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

    setCatagory((prev) => ({
      ...prev,
      [name]: type === 'file' ? files[0] : value,
    }))
  }

  const handleSubmit = async () => {
    if (Catagory.nameEn) {
      try {
        const token = sessionStorage.getItem('token')

        const formData = new FormData()

        if (Catagory.image && Catagory.image instanceof File) {
          formData.append('Image', Catagory.image)
        } else {
          toast.error('Please upload a valid image')
          return
        }

        formData.append('Name', Catagory.nameEn)
        formData.append('NameAr', Catagory.nameAr)
        formData.append('Description', Catagory.descriptionEn || '')
        formData.append('DescriptionAr', Catagory.descriptionAr || '')
        formData.append('IsActive', Catagory.status)

        const response = await axios.post(`http://test.smartsto0re.shop/api/Categories`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        })

        toast.success('Catagory added successfully!')
        console.log(response.data)
        onSave(response.data)
        onClose()
      } catch (error) {
        console.error('❌ Error Response:', error.response?.data || error.message)
        toast.error('Failed to add Catagory. Check required fields.')
      }
    } else {
      toast.error('Please fill required fields')
    }
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Catagory</DialogTitle>
      <DialogContent>
        <TextField
          label="Catagory Name Arabic"
          name="nameAr"
          fullWidth
          margin="dense"
          value={Catagory.nameAr}
          onChange={handleChange}
        />
        <TextField
          label="Catagory Name English"
          name="nameEn"
          fullWidth
          margin="dense"
          value={Catagory.nameEn}
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
          value={Catagory.descriptionEn}
          onChange={handleChange}
        />

        <TextField
          label="Description Arabic"
          name="descriptionAr"
          fullWidth
          margin="dense"
          multiline
          rows={4}
          value={Catagory.descriptionAr}
          onChange={handleChange}
        />
        <TextField
          select
          label="Select status"
          name="status"
          fullWidth
          margin="normal"
          value={Catagory.status}
          onChange={(e) => {
            const value = e.target.value === 'true' ? true : false
            setCatagory((prev) => ({ ...prev, status: value }))
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

export default AddCatagoryDialog
