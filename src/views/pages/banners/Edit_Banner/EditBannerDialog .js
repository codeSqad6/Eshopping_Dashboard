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

const EditBannerDialog = ({ open, onClose, onSave, initialData }) => {
  const [Banner, setBanner] = useState({
    nameEn: '',
    nameAr: '',
    descriptionEn: '',
    descriptionAr: '',
    linkurl: '',
    order: '',
    image: null,
    status: 'true',
    imageUrl: '',
  })

  useEffect(() => {
    if (open && initialData) {
      setBanner({
        nameEn: initialData.title || '',
        nameAr: initialData.titleAr || '',
        descriptionEn: initialData.description || '',
        descriptionAr: initialData.descriptionAr || '',
        linkurl: initialData.linkUrl || '',
        order: initialData.order || '',
        image: null,
        status: initialData.isActive ? 'true' : 'false',
        imageUrl: initialData.imageUrl || '',
        id: initialData.id,
      })
    }
  }, [open, initialData])

  const handleChange = (e) => {
    const { name, value, type, files } = e.target
    if (type === 'file') {
      setBanner((prev) => ({ ...prev, image: files[0] }))
    } else {
      setBanner((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async () => {
    if (!Banner.nameEn) {
      toast.error('Please fill required fields')
      return
    }

    try {
      const formData = new FormData()
      formData.append('Title', Banner.nameEn)
      formData.append('TitleAr', Banner.nameAr)
      formData.append('Description', Banner.descriptionEn)
      formData.append('DescriptionAr', Banner.descriptionAr)
      formData.append('LinkUrl', Banner.linkurl)
      formData.append('Order', Banner.order)
      formData.append('IsActive', Banner.status === 'true')

      if (Banner.image instanceof File) {
        formData.append('Image', Banner.image)
      }

      const token = sessionStorage.getItem('token')

      const response = await axios.put(`http://test.smartsto0re.shop/api/Banner/${Banner.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      )

      toast.success('Banner updated successfully')
      onSave?.(response.data)
      onClose()
    } catch (error) {
      console.error(error)
      toast.error('Failed to update Banner')
    }
  }
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit Banner</DialogTitle>
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

          {Banner.imageUrl?.length > 0 && (
          <div style={{ marginBottom: '1rem' }}>
            <img
              src={`http://test.smartsto0re.shop${Banner.imageUrl}`}
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

export default EditBannerDialog
