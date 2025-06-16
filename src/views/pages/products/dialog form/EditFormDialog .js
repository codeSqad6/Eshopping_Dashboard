// components/EditProductDialog.js
import React, { useEffect, useState } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'

const API_BASE = 'http://test.smartsto0re.shop/api'

const EditProductDialog = ({ open, onClose, onSave, initialData }) => {
  const [product, setProduct] = useState({
    nameEn: '',
    nameAr: '',
    image: null,
    brandId: '',
    categoryId: '',
    type: '',
    price: '',
    descriptionEn: '',
    descriptionAr: '',
    discount: '',
    status: '',
  })

  const brands = [
    { id: 1, name: 'Dell' },
    { id: 2, name: 'Nike' },
  ]

  const categories = [
    { id: 1, name: 'cat1' },
    { id: 2, name: 'cat2' },
  ]

  useEffect(() => {
    if (initialData) {
      setProduct(initialData)
    }
  }, [initialData])

  const handleChange = (e) => {
    const { name, value, type, files } = e.target
    if (type === 'file') {
      setProduct((prev) => ({ ...prev, [name]: files[0] }))
    } else {
      setProduct((prev) => ({ ...prev, [name]: value }))
    }
  }

  // const handleSubmit = () => {
  //   if (product.nameEn && product.price) {
  //     onSave(product)
  //     onClose()
  //     toast.success(' Product updated successfully')
  //   } else {
  //     toast.error('Please fill required fields')
  //   }
  // }
  // const handleSubmit = async () => {
  //   if (product.nameEn && product.price) {
  //     try {
  //       const formData = new FormData()
  //       formData.append('id', product.id)
  //       formData.append('Name', product.nameEn)
  //       // formData.append('nameAr', product.nameAr)
  //       formData.append('Price ', product.price)
  //       formData.append('discount', product.discount)
  //       formData.append('Description ', product.descriptionEn)
  //       // formData.append('descriptionAr', product.descriptionAr)
  //       formData.append('BrandId', product.brandId)
  //       formData.append('IsActive', product.status)
  //       formData.append('CategoryId', product.categoryId)
  //       formData.append('StockQuantity', 5)
  //       formData.append('SubCategoryId', 'saasaa')
  //       if (product.image instanceof File) {
  //         formData.append('Images', product.image)
  //       }
  //       console.log(formData)
  //       const token = sessionStorage.getItem('token') // أو بأي طريقة تخزن بها التوكن

  //       const response = await axios.put(`${API_BASE}/products/${product.id}`, formData, {
  //         headers: {
  //           'Content-Type': 'multipart/form-data',
  //           Authorization: `Bearer ${token}`,
  //         },
  //       })
  //       console.log(response)
  //       onSave(response.data)
  //       onClose()
  //       toast.success('Product updated successfully')
  //     } catch (error) {
  //       console.error(error)
  //       toast.error('Failed to update product')
  //     }
  //   } else {
  //     toast.error('Please fill required fields')
  //   }
  // }
  const handleSubmit = async () => {
    if (product.nameEn && product.price) {
      try {
        const token = sessionStorage.getItem('token')

        const formData = new FormData()
        if (product.image && product.image instanceof File) {
          formData.append('Images', product.image)
        }

        const params = {
          id: product.id,
          Name: product.nameEn,
          Price: product.price,
          // discount: product.discount,
          Description: product.descriptionEn,
          BrandId: product.brandId,
          IsActive: product.status,
          CategoryId: product.categoryId,
          StockQuantity: 5,
          SubCategoryId: 'saasaa',
        }
        console.log(params)
        const response = await axios.put(`${API_BASE}/products/${product.id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
          params: params,
        })

        console.log(response)
        onSave(response.data)
        onClose()
        toast.success('Product updated successfully')
      } catch (error) {
        console.error(error)
        toast.error('Failed to update product')
      }
    } else {
      toast.error('Please fill required fields')
    }
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
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
          label="Price"
          name="price"
          type="number"
          fullWidth
          margin="dense"
          value={product.price}
          onChange={handleChange}
        />

        <TextField
          label="Discount (%)"
          name="discount"
          type="number"
          fullWidth
          margin="dense"
          value={product.discount}
          onChange={handleChange}
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
          label="Select status"
          name="status"
          fullWidth
          margin="normal"
          value={product.status}
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

export default EditProductDialog
