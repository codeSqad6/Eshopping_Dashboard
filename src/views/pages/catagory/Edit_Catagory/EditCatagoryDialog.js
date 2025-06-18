import React, { useEffect, useState } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material'
import { toast } from 'react-toastify'
import axios from 'axios'

const EditCatagoryDialog = ({ open, onClose, onSave, initialData }) => {
  const [Catagory, setCatagory] = useState({
    nameEn: '',
    nameAr: '',
    descriptionEn: '',
    descriptionAr: '',
    image: null,
    status: 'true',
  })

  useEffect(() => {
    if (initialData) {
      setCatagory({
        nameEn: initialData.name || '',
        nameAr: initialData.nameAr || '',
        descriptionEn: initialData.description || '',
        descriptionAr: initialData.descriptionAr || '',
        image: null,
        status: initialData.isActive ? 'true' : 'false',
        id: initialData.id,
      })
    }
  }, [initialData])

  const handleChange = (e) => {
    const { name, value, type, files } = e.target
    if (type === 'file') {
      setCatagory((prev) => ({ ...prev, [name]: files[0] }))
    } else {
      setCatagory((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async () => {
    if (Catagory.nameEn) {
      try {
        const formData = new FormData()
        formData.append('Name', Catagory.nameEn)
        formData.append('NameAr', Catagory.nameAr)
        formData.append('Description', Catagory.descriptionEn)
        formData.append('DescriptionAr', Catagory.descriptionAr)
        formData.append('IsActive', Catagory.status === 'true')
        if (Catagory.image instanceof File) {
          formData.append('Image', Catagory.image)
        }

        const token = sessionStorage.getItem('token')
        const response = await axios.put(
          `http://test.smartsto0re.shop/api/Catagories/${Catagory.id}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${token}`,
            },
          },
        )

        toast.success('Catagory updated successfully')
        onSave(response.data)
        onClose()
      } catch (error) {
        console.error(error)
        toast.error('Error updating Catagory')
      }
    } else {
      toast.error('Please fill required fields')
    }
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit Catagory</DialogTitle>
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
          value={Catagory.descriptionEn}
          onChange={handleChange}
        />
        <TextField
          label="Description Arabic"
          name="descriptionAr"
          fullWidth
          margin="dense"
          multiline
          rows={2}
          value={Catagory.descriptionAr}
          onChange={handleChange}
        />
        <TextField
          select
          label="Status"
          name="status"
          fullWidth
          margin="normal"
          value={Catagory.status}
          onChange={handleChange}
          SelectProps={{ native: true }}
        >
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default EditCatagoryDialog
