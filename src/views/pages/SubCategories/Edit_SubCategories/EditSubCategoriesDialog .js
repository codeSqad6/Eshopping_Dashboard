import React, { useEffect, useState } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material'
import { getAllCategories } from '../../../../services/categoryService'
import { toast } from 'react-toastify'
import axios from 'axios'

const EditSub_CatDialog = ({ open, onClose, onSave, initialData }) => {
  const [subCat, setSubCat] = useState({
    nameEn: '',
    nameAr: '',
    descriptionEn: '',
    descriptionAr: '',
    image: null,
    status: 'true',
    id: '',
  })
  const [categories, setCategories] = useState([])
useEffect(() => {
  const fetchData = async () => {
    try {
      const data = await getAllCategories()
      setCategories(data)
    } catch (error) {
      toast.error('Error fetching categories')
      setCategories([])
    }
  }
  fetchData()
}, [])


  useEffect(() => {
    if (open && initialData) {
      setSubCat({
        nameEn: initialData.name || '',
        nameAr: initialData.nameAr ||  '',
        categoryId: initialData.categoryId || '',
        descriptionEn: initialData.description ||  '',
        descriptionAr: initialData.descriptionAr || '',
        categoryId: initialData.categoryId || '',
        image: initialData.imageUrl || '',
        status: initialData.isActive ? 'true' : 'false',
        id: initialData.id || '',
      })
    }
  }, [open, initialData])

  const handleChange = (e) => {
    const { name, value, type, files } = e.target
    if (type === 'file') {
      setSubCat((prev) => ({ ...prev, image: files[0] }))
    } else {
      setSubCat((prev) => ({ ...prev, [name]: value }))
    }
  }
const onFileSelected = (event) => {
  const file = event.target.files[0]
  if (file && file.type.startsWith('image/')) {
    setSubCat((prev) => ({
      ...prev,
      image: file,
    }))
  } else {
    toast.error('Please select a valid image')
  }
}


  const handleSubmit = async () => {
    if (!subCat.nameEn) {
      toast.error('Please fill required fields')
      return
    }

    try {
      const formData = new FormData()
      formData.append('Name', subCat.nameEn)
      formData.append('NameAr', subCat.nameAr)
      formData.append('CategoryId', subCat.categoryId)
      formData.append('Description', subCat.descriptionEn)
      formData.append('DescriptionAr', subCat.descriptionAr)
      formData.append('CategoryId', subCat.categoryId)
      formData.append('IsActive', subCat.status === 'true' ? 'true' : 'false')

      if (subCat.image instanceof File) {
        formData.append('Image', subCat.image)
      }

      const token = sessionStorage.getItem('token')
      const response = await axios.put(
        `http://test.smartsto0re.shop/api/SubCategories/${subCat.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        },
      )

      toast.success('Sub Category updated successfully')
      onSave?.(response.data)
      onClose()
    } catch (error) {
      const errData = error.response?.data
      console.error('❌ Full Error:', errData || error.message)

      if (errData?.errors) {
        for (const key in errData.errors) {
          toast.error(`${key}: ${errData.errors[key].join(', ')}`)
        }
      } else {
        toast.error(errData?.title || 'Request failed - check the fields')
      }
    }
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit Sub Category</DialogTitle>
      <DialogContent>
        <TextField
          label="Arabic Name"
          name="nameAr"
          fullWidth
          margin="dense"
          value={subCat.nameAr}
          onChange={handleChange}
        />
        <TextField
          label="English Name"
          name="nameEn"
          fullWidth
          margin="dense"
          value={subCat.nameEn}
          onChange={handleChange}
        />

        {subCat.imageUrl && (
          <div style={{ marginBottom: '1rem' }}>
            <img
              src={`http://test.smartsto0re.shop${subCat.imageUrl}`}
              alt="Sub Category"
              style={{ width: '100px', borderRadius: '6px' }}
            />
          </div>
        )}

        <label style={{ display: 'block', marginTop: '1rem' }}>Upload New Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={onFileSelected}
          style={{ marginBottom: '1rem' }}
        />

        <TextField
          label="English Description"
          name="descriptionEn"
          fullWidth
          margin="dense"
          multiline
          rows={3}
          value={subCat.descriptionEn}
          onChange={handleChange}
        />
        <TextField
          label="Arabic Description"
          name="descriptionAr"
          fullWidth
          margin="dense"
          multiline
          rows={3}
          value={subCat.descriptionAr}
          onChange={handleChange}
        />
        <TextField
          select
          label="Select Category"
          name="categoryId"
          fullWidth
          margin="normal"
          value={subCat.categoryId}
          onChange={handleChange}
          SelectProps={{ native: true }}
        >
          <option value=""></option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </TextField>
        <TextField
          select
          label="Status"
          name="status"
          fullWidth
          margin="normal"
          value={subCat.status}
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
        <Button variant="contained" onClick={handleSubmit}>
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default EditSub_CatDialog
