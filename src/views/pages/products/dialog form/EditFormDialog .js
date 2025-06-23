import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material'

import { getAllBrands } from '../../../../services/brandService'
import { getAllCategories } from '../../../../services/categoryService'
import { getAllSubCategories } from '../../../../services/subCategory'

const EditProductDialog = ({ open, onClose, initialData, onSave }) => {
  const [product, setProduct] = useState({
    nameEn: '',
    nameAr: '',
    descriptionEn: '',
    descriptionAr: '',
    image: null,
    brandId: '',
    categoryId: '',
    subCategoryId: '',
    price: '',
    status: '',
    stockQuantity: '',
  })

  const [brands, setBrands] = useState([])
  const [categories, setCategories] = useState([])
  const [subCategories, setSubCategories] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [brandData, categoryData, subCategoryData] = await Promise.all([
          getAllBrands(),
          getAllCategories(),
          getAllSubCategories(),
        ])
        setBrands(brandData)
        setCategories(categoryData)
        setSubCategories(subCategoryData)
      } catch (error) {
        toast.error('Error fetching data')
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    console.log('Dialog open status:', open)
    console.log('Product data:', initialData)

    if (open && initialData) {
      console.log('opened')

      setProduct({
        nameEn: initialData.name || '',
        nameAr: initialData.nameAr ||'',
        descriptionEn: initialData.description || '',
        descriptionAr: initialData.descriptionAr ||  '',
        image: null,
        brandId: initialData.brandId || '',
        categoryId: initialData.categoryId || '',
        subCategoryId: initialData.subCategoryId || '',
        price: initialData.price || '',
        status: initialData.isActive ? 'true' : 'false',
        stockQuantity: initialData.stockQuantity || '',
        imageUrls: initialData.imageUrls || [],
      })
    }
  }, [open, initialData])

  const handleChange = (e) => {
    const { name, value } = e.target
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const onFileSelected = (event) => {
    const file = event.target.files[0]
    if (file && file.type.startsWith('image/')) {
      setProduct((prev) => ({
        ...prev,
        image: file,
      }))
    } else {
      toast.error('Please select a valid image')
    }
  }

  const handleSubmit = async () => {
    if (!product.nameEn || !product.price) {
      toast.error('Please fill required fields')
      return
    }

    try {
      const token = sessionStorage.getItem('token')
      const formData = new FormData()

      formData.append('Id', product.id)
      formData.append('Name', product.nameEn)
      formData.append('NameAr', product.nameAr)
      formData.append('Description', product.descriptionEn)
      formData.append('DescriptionAr', product.descriptionAr)
      formData.append('Price', product.price.toString())
      formData.append('StockQuantity', product.stockQuantity?.toString())
      formData.append('IsActive', product.status === 'true' ? 'true' : 'false')
      formData.append('CategoryId', product.categoryId)
      formData.append('SubCategoryId', product.subCategoryId)
      formData.append('BrandId', product.brandId)

      if (product.image instanceof File) {
        formData.append('Images', product.image)
      }

      const response = await axios.put(
        `http://test.smartsto0re.shop/api/Products/${initialData.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

      toast.success('Product updated successfully')
      onSave?.(response.data)
      onClose()
    } catch (error) {
      console.error(error)
      toast.error('Failed to update product')
    }
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Product</DialogTitle>
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

        {product.imageUrls?.length > 0 && (
          <div style={{ marginBottom: '1rem' }}>
            <img
              src={`http://test.smartsto0re.shop${product.imageUrls[0]}`}
              alt="Product"
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
          label="Description English"
          name="descriptionEn"
          fullWidth
          margin="dense"
          multiline
          rows={3}
          value={product.descriptionEn}
          onChange={handleChange}
        />
        <TextField
          label="Description Arabic"
          name="descriptionAr"
          fullWidth
          margin="dense"
          multiline
          rows={3}
          value={product.descriptionAr}
          onChange={handleChange}
        />
        <TextField
          select
          label="Select Brand"
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
          label="Select Category"
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
          label="Select SubCategory"
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
          label="Stock Quantity"
          name="stockQuantity"
          type="number"
          fullWidth
          margin="dense"
          value={product.stockQuantity}
          onChange={handleChange}
        />
        <TextField
          select
          label="Status"
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
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default EditProductDialog
