import React, { useEffect, useState } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material'
import { toast } from 'react-toastify'
import axios from 'axios'

const EditCatagoryDialog = ({ open, onClose, onSave, productData }) => {
  const [Catagory, setCatagory] = useState({
    nameEn: '',
    nameAr: '',
    descriptionEn: '',
    descriptionAr: '',
    image: null,
    imageUrl:'',
    status: 'true',
  })

  useEffect(() => {
    if (productData) {
      console.log(productData,'productData');

      setCatagory({
        nameEn: productData.name || '',
        nameAr: productData.nameAr || '',
        descriptionEn: productData.description || '',
        descriptionAr: productData.descriptionAr || '',
        image: null,
         imageUrl: productData.imageUrl || '',
        status: productData.isActive ? 'true' : 'false',
        id: productData.id,
      })
    }
  }, [productData])

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
        formData.append('Description', Catagory.descriptionEn || '')
        formData.append('DescriptionAr', Catagory.descriptionAr || '')
        formData.append('IsActive', Catagory.status)
        if (Catagory.image instanceof File) {
          formData.append('Image', Catagory.image)
        }

        const token = sessionStorage.getItem('token')
        const response = await axios.put(
          `http://test.smartsto0re.shop/api/Categories/${productData.id}`,
          formData,
          {
            headers: {
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
       {Catagory.imageUrl && (
  <div style={{ marginBottom: '1rem' }}>
    <img
      src={`http://test.smartsto0re.shop${Catagory.imageUrl}`}
      alt="Category"
      style={{ width: '100px', borderRadius: '6px', objectFit: 'cover' }}
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
