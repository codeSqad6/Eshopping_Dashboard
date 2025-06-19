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
const AddBannerDialog = ({ open, onClose, onSave, initialData }) => {
  const [Banner, setBanner] = useState({
    nameEn: '',
    nameAr: '',
    descriptionEn: '',
    descriptionAr: '',
    linkurl: '',
    order: '',
    status: '',
  })

  useEffect(() => {
    if (initialData) {
      setBanner({
        id: initialData.id || '',
        nameEn: initialData.nameEn || '',
        nameAr: initialData.nameAr || '',
        descriptionEn: initialData.description || '',
        descriptionAr: initialData.descriptionAr || '',
        linkurl: initialData.linkurl || '',
        order: initialData.order || '',
        status: initialData.isActive ? 'true' : 'false',
        image: null,
      })
    }
  }, [initialData])

const handleChange = (e) => {
  const { name, value, type, files } = e.target;
  if (type === 'file') {
    setBanner((prev) => ({ ...prev, [name]: files[0] }));
  } else {
    setBanner((prev) => ({ ...prev, [name]: value }));
  }
};

  const handleSubmit = async () => {
    if (Banner.nameEn) {
      try {
        const token = sessionStorage.getItem('token')

        const formData = new FormData()

        if (Banner.image && Banner.image instanceof File) {
          formData.append('Image', Banner.image)
        } else {
          toast.error('Please upload a valid image')
          return
        }

        formData.append('Title', Banner.nameEn)
        formData.append('TitleAr', Banner.nameAr)
        formData.append('Description', Banner.descriptionEn || '')
        formData.append('DescriptionAr', Banner.descriptionAr || '')
        formData.append('LinkUrl', Banner.linkurl || '')
        formData.append('Order', Banner.order || '')
        formData.append('IsActive', Banner.status)

        const response = await axios.post(`http://test.smartsto0re.shop/api/Banner`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        })

        toast.success('Banner added successfully!')
        console.log(response.data)
        onSave(response.data)
        onClose()
      } catch (error) {
        console.error('❌ Error Response:', error.response?.data|| error.message)
        toast.error('Failed to add Banner. Check required fields.')
      }
    } else {
      toast.error('Please fill required fields')
    }
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Banner</DialogTitle>
      <DialogContent>
        <TextField
          label="Banner Name Arabic"
          name="nameAr"
          fullWidth
          margin="dense"
          value={Banner.nameAr}
          onChange={handleChange}
        />
        <TextField
          label="Banner Name English"
          name="nameEn"
          fullWidth
          margin="dense"
          value={Banner.nameEn}
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
          value={Banner.descriptionEn}
          onChange={handleChange}
        />

        <TextField
          label="Description Arabic"
          name="descriptionAr"
          fullWidth
          margin="dense"
          multiline
          rows={4}
          value={Banner.descriptionAr}
          onChange={handleChange}
        />
             <TextField
          label="Banner linkurl"
          name="linkurl"
          fullWidth
          margin="dense"
          value={Banner.linkurl}
          onChange={handleChange}
        /> 
         <TextField
          label="Banner order"
          name="order"
          fullWidth
          margin="dense"
          value={Banner.order}
          onChange={handleChange}
        />
        <TextField
          select
          label="Select status"
          name="status"
          fullWidth
          margin="normal"
          value={Banner.status}
          onChange={(e) => {
            const value = e.target.value === 'true' ? true : false
            setBanner((prev) => ({ ...prev, status: value }))
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

export default AddBannerDialog
