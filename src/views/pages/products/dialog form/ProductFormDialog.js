


import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material'
import { getAllBrands } from '../../../../services/brandService'
import { getAllCategories } from '../../../../services/categoryService'
import { getAllSubCategories } from '../../../../services/subCategory'

const ProductFormDialog = ({ open, onClose, onSave }) => {
  const [product, setProduct] = useState({
    nameEn: '',
    nameAr: '',
    descriptionEn: '',
    descriptionAr: '',
    image: null,
    brandId: '',
    categoryId: '',
    subCategoryId:'',
    price: '',
    status: '',
    stockQuantity: '',
  })
  const [brands, setBrands] = useState([])
  const [categories, setCategories] = useState([])
  const [subCategories, setSubCategories] = useState([])
  const fetchBrands = async () => {
    try {
      const data = await getAllBrands()
      setBrands(data)
      console.log('brands', brands)
    } catch (error) {
      console.error('Error fetching products:', error)
    }
  }
  const fetchCategories = async () => {
    try {
      const data = await getAllCategories()
      setCategories(data)
      console.log('categories', categories)
    } catch (error) {
      console.error('Error fetching products:', error)
    }
  }
  const fetchSubCategories = async () => {
    try {
      const data = await getAllSubCategories()
      setSubCategories(data)
      console.log('sub', subCategories)
    } catch (error) {
      console.error('Error fetching products:', error)
    }
  }
  useEffect(() => {
    fetchBrands()
    fetchCategories()
    fetchSubCategories()
  }, [])
  const onFileSelected = (event) => {
    const file = event.target.files[0]
    if (file && file.type.startsWith('image/')) {
      setProduct((prev) => ({
        ...prev,
        image: file,
      }))
    } else {
      setProduct((prev) => ({
        ...prev,
        image: null,
      }))
      toast.error('Please select a valid image file')
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async () => {
    if (product.nameEn && product.price) {
      try {
        const token = sessionStorage.getItem('token')
        const formData = new FormData()

        if (product.image instanceof File) {
          formData.append('Images', product.image) 
        } else {
          toast.error('Please select a valid image')
          return
        }

        formData.append('Name', product.nameEn)
        formData.append('NameAr', product.nameAr)
        formData.append('Description', product.descriptionEn)
        formData.append('DescriptionAr', product.descriptionAr)
        formData.append('Price', product.price.toString())
        formData.append('StockQuantity', product.stockQuantity?.toString() )
        formData.append('IsActive', product.status === 'true' ? 'true' : 'false')
        formData.append('CategoryId', product.categoryId)
        formData.append('SubCategoryId', product.subCategoryId)
        formData.append('BrandId', product.brandId)

        const response = await axios.post('http://test.smartsto0re.shop/api/Products', formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        toast.success('Product added successfully')
        onSave?.(response.data)
        onClose()
      } catch (error) {
        console.error(error)
        toast.error('Failed to add product')
      }
    } else {
      toast.error('Please fill required fields')
    }
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Product</DialogTitle>
      <DialogContent>
        <TextField
          label="Product Name Arabic"
          name="nameAr"
          fullWidth
          margin="dense"
          value={product.nameAr}
          onChange={handleChange}
        />
        <TextField
          label="Product Name English"
          name="nameEn"
          fullWidth
          margin="dense"
          value={product.nameEn}
          onChange={handleChange}
        />

        <label style={{ marginTop: '1rem', display: 'block' }}>Upload Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={onFileSelected}
          style={{ marginBottom: '1rem' }}
        />

        <TextField
          label="Description English"
          name="descriptionEn"
          fullWidth
          margin="dense"
          multiline
          rows={4}
          value={product.descriptionEn}
          onChange={handleChange}
        />
        <TextField
          label="Description Arabic"
          name="descriptionAr"
          fullWidth
          margin="dense"
          multiline
          rows={4}
          value={product.descriptionAr}
          onChange={handleChange}
        />
        <TextField
          select
          label="Select a brand"
          name="brandId"
          fullWidth
          margin="normal"
          value={product.brandId}
          onChange={handleChange}
          SelectProps={{ native: true }}
        >
          <option value=""></option>
          {brands.map((brand) => (
            <option key={brand.id} value={brand.id}>
              {brand.name}
            </option>
          ))}
        </TextField>
        <TextField
          select
          label="Select a category"
          name="categoryId"
          fullWidth
          margin="normal"
          value={product.categoryId}
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
          label="Select a sub Category"
          name="subCategoryId"
          fullWidth
          margin="normal"
          value={product.subCategoryId}
          onChange={handleChange}
          SelectProps={{ native: true }}
        >
          <option value=""></option>
          {subCategories.map((sub) => (
            <option key={sub.id} value={sub.id}>
              {sub.name}
            </option>
          ))}
        </TextField>
        <TextField
          label="Price"
          name="price"
          type="number"
          fullWidth
          margin="dense"
          value={product.price}
          onChange={handleChange}
        />
        <TextField
          label="stock Quantity "
          name="stockQuantity"
          type="number"
          fullWidth
          margin="dense"
          value={product.stockQuantity}
          onChange={handleChange}
        />
        <TextField
          select
          label="Select status"
          name="status"
          fullWidth
          margin="normal"
          value={product.status}
          onChange={handleChange}
          SelectProps={{ native: true }}
        >
          <option value=""></option>
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

export default ProductFormDialog
