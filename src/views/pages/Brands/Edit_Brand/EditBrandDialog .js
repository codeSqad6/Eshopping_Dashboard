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

const EditBrandDialog = ({ open, onClose, onSave, initialData }) => {
  const [brand, setBrand] = useState({
    nameEn: '',
    nameAr: '',
    descriptionEn: '',
    descriptionAr: '',
    image: null,
    status: 'true',
  })

  useEffect(() => {
    if (initialData) {
      setBrand({
        nameEn: initialData.name || '',
        nameAr: initialData.name || '',
        descriptionEn: initialData.description || '',
        descriptionAr: initialData.description || '',
        image: null,
        status: initialData.isActive ? 'true' : 'false',
        id: initialData.id,
      })
    }
  }, [initialData])

  const handleChange = (e) => {
    const { name, value, type, files } = e.target
    if (type === 'file') {
      setBrand((prev) => ({ ...prev, [name]: files[0] }))
    } else {
      setBrand((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async () => {
    if (brand.nameEn) {
      try {
        const formData = new FormData()
        formData.append('Name', brand.nameEn)
        formData.append('NameAr', brand.nameAr)
        formData.append('Description', brand.descriptionEn)
        formData.append('DescriptionAr', brand.descriptionAr)
        formData.append('IsActive', brand.status === 'true')
        if (brand.image instanceof File) {
          formData.append('Image', brand.image)
        }

        const token = sessionStorage.getItem('token')
        const response = await axios.put(
          `http://test.smartsto0re.shop/api/Brands/${brand.id}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${token}`,
            },
          }
        )

        toast.success('Brand updated successfully')
        onSave(response.data)
        onClose()
      } catch (error) {
        console.error(error)
        toast.error('Error updating brand')
      }
    } else {
      toast.error('Please fill required fields')
    }
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit Brand</DialogTitle>
      <DialogContent>
        <TextField
          label="Brand Name Arabic"
          name="nameAr"
          fullWidth
          margin="dense"
          value={brand.nameAr}
          onChange={handleChange}
        />
        <TextField
          label="Brand Name English"
          name="nameEn"
          fullWidth
          margin="dense"
          value={brand.nameEn}
          onChange={handleChange}
        />
        <TextField
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
          rows={2}
          value={brand.descriptionEn}
          onChange={handleChange}
        />
        <TextField
          label="Description Arabic"
          name="descriptionAr"
          fullWidth
          margin="dense"
          multiline
          rows={2}
          value={brand.descriptionAr}
          onChange={handleChange}
        />
        <TextField
          select
          label="Status"
          name="status"
          fullWidth
          margin="normal"
          value={brand.status}
          onChange={handleChange}
          SelectProps={{ native: true }}
        >
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>Save Changes</Button>
      </DialogActions>
    </Dialog>
  )
}

export default EditBrandDialog
