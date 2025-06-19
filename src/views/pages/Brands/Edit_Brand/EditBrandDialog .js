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

const EditBrandDialog = ({ open, onClose, onSave, initialData }) => {
  const [brand, setBrand] = useState({
    nameEn: '',
    nameAr: '',
    descriptionEn: '',
    descriptionAr: '',
    image: null,
    status: 'true',
    logoUrl: '',
  })

  useEffect(() => {
    if (open && initialData) {
      setBrand({
        nameEn: initialData.name || '',
        nameAr: initialData.name || '',
        descriptionEn: initialData.description || '',
        descriptionAr: initialData.description || '',
        image: null,
        status: initialData.isActive ? 'true' : 'false',
        logoUrl: initialData.logoUrl || '',
        id: initialData.id,
      })
    }
  }, [open, initialData])

  const handleChange = (e) => {
    const { name, value, type, files } = e.target
    if (type === 'file') {
      setBrand((prev) => ({ ...prev, image: files[0] }))
    } else {
      setBrand((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async () => {
    if (!brand.nameEn) {
      toast.error('Please fill required fields')
      return
    }

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
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      )

      toast.success('Brand updated successfully')
      onSave?.(response.data)
      onClose()
    } catch (error) {
      console.error(error)
      toast.error('Failed to update brand')
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

          {brand.logoUrl?.length > 0 && (
          <div style={{ marginBottom: '1rem' }}>
            <img
              src={`http://test.smartsto0re.shop${brand.logoUrl}`}
              alt="Product"
              style={{ width: '100px', borderRadius: '6px' }}
            />
          </div>
        )}

        <label style={{ display: 'block', marginTop: '1rem' }}>Upload New Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleChange}
          style={{ marginBottom: '1rem' }}
        />
        <TextField
          label="Description English"
          name="descriptionEn"
          fullWidth
          margin="dense"
          multiline
          rows={4}
          value={brand.descriptionEn}
          onChange={handleChange}
        />

        <TextField
          label="Description Arabic"
          name="descriptionAr"
          fullWidth
          margin="dense"
          multiline
          rows={4}
          value={brand.descriptionAr}
          onChange={handleChange}
        />

        <TextField
          select
          label="Select status"
          name="status"
          fullWidth
          margin="normal"
          value={brand.status}
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

export default EditBrandDialog
