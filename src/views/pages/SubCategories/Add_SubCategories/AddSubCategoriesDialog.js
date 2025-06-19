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
import { getAllCategories } from '../../../../services/categoryService'
const AddsubCatDialog = ({ open, onClose, onSave, initialData  }) => {
  const [subCat, setsubCat] = useState({
    nameEn: '',
    nameAr: '',
    categoryId: '',
    descriptionEn: '',
    descriptionAr: '',
    status: '',
  })
const [categories, setCategories] = useState([])
  const fetchCategories = async () => {
    try {
      const data = await getAllCategories()
      setCategories(data)
      console.log('categories', categories)
    } catch (error) {
      console.error('Error fetching products:', error)
    }
  }
 useEffect(() => {
    fetchCategories()
  }, [])
  const onFileSelected = (event) => {
    const file = event.target.files[0]
    if (file && file.type.startsWith('image/')) {
      setsubCat((prev) => ({
        ...prev,
        image: file,
      }))
    } else {
      setsubCat((prev) => ({
        ...prev,
        image: null,
      }))
      toast.error('Please select a valid image file')
    }
  }



 const handleChange = (e) => {
  const { name, value, type, files } = e.target;

  setsubCat((prev) => ({
    ...prev,
    [name]: type === 'file' ? files[0] : value,
  }));
};

const handleSubmit = async () => {
  if (subCat.nameEn) {
    try {
      const token = sessionStorage.getItem('token')

      const formData = new FormData()

    
      if (subCat.image && subCat.image instanceof File) {
        formData.append('Image', subCat.image)
      } else {
        toast.error('Please upload a valid image')
        return
      }

     
      formData.append('Name', subCat.nameEn)
      formData.append('NameAr', subCat.nameAr)
      formData.append('CategoryId', subCat.categoryId)
      formData.append('Description', subCat.descriptionEn || '')
      formData.append('DescriptionAr', subCat.descriptionAr || '')
        formData.append('CategoryId', subCat.categoryId)
      formData.append('IsActive', subCat.status)

     
      const response = await axios.post(`http://test.smartsto0re.shop/api/SubCategories`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      })

      toast.success('subCat added successfully!')
      console.log(response.data)
      onSave(response.data)
      onClose()

    } catch (error) {
      console.error('❌ Error Response:', error.response?.data || error.message)
      toast.error('Failed to add subCat. Check required fields.')
    }
  } else {
    toast.error('Please fill required fields')
  }
}



  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New subCat</DialogTitle>
      <DialogContent>
        <TextField
          label="subCat Name Arabic"
          name="nameAr"
          fullWidth
          margin="dense"
          value={subCat.nameAr}
          onChange={handleChange}
        />
        <TextField
          label="subCat Name English"
          name="nameEn"
          fullWidth
          margin="dense"
          value={subCat.nameEn}
          onChange={handleChange}
        />
        <TextField
          className="mt-4"
          label="Upload Image"
          type="file"
          name="image"
          fullWidth
          margin="dense"
       onChange={onFileSelected}
  InputLabelProps={{ shrink: true }}
        />

        <TextField
          label="Description English"
          name="descriptionEn"
          fullWidth
          margin="dense"
          multiline
          rows={4}
          value={subCat.descriptionEn}
          onChange={handleChange}
        />

        <TextField
          label="Description Arabic"
          name="descriptionAr"
          fullWidth
          margin="dense"
          multiline
          rows={4}
          value={subCat.descriptionAr}
          onChange={handleChange}
        />
          <TextField
                  select
                  label="Select a category"
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
  label="Select status"
  name="status"
  fullWidth
  margin="normal"
  value={subCat.status}
  onChange={(e) => {
    const value = e.target.value === 'true' ? true : false
    setsubCat((prev) => ({ ...prev, status: value }))
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

export default AddsubCatDialog
