import React, { useState } from 'react'
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
// const API_url='http://test.smartsto0re.shop/api/Products?'
const ProductFormDialog = ({ open, onClose, onSave }) => {
  const [product, setProduct] = useState({
    nameEn: '',
    nameAr: '',
    descriptionEn: '',
    descriptionAr: '',
    image: '',
    brandId: '',
    categoryId: '',
    price: '',
    discount: '',
    status: '',
  })

  const brands = [
    { id: 1, name: 'brand1' },
    { id: 2, name: 'brand2' },
  ]
  const categories = [
    { id: 1, name: 'Category1' },
    { id: 2, name: 'Category2' },
  ]


 const handleChange = (e) => {
  const { name, value, type, files } = e.target;

  setProduct((prev) => ({
    ...prev,
    [name]: type === 'file' ? files[0] : value,
  }));
};

const handleSubmit = async () => {
  if (product.nameEn && product.price) {
    try {
      const token = sessionStorage.getItem('token')

      const formData = new FormData()

      // 👇 التأكد من إرسال الصورة فقط لو كانت ملف فعلي
      if (product.image && product.image instanceof File) {
        formData.append('Images', product.image)
      }

      // ✅ إضافة كل البيانات إلى formData
      const params = {
          Name: product.nameEn,
          Price: product.price,
          // discount: product.discount,
          Description: product.descriptionEn,
          BrandId: product.brandId,
          IsActive: product.status,
          CategoryId: product.categoryId,
          StockQuantity: 5,
          SubCategoryId: '5',
        }
          
      // إرسال الطلب
      const response = await axios.post(`http://test.smartsto0re.shop/api/Products`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
           params: params,
      })

      console.log(response)
      onSave(response.data)
      onClose()
      toast.success('Product added successfully')
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
        <TextField
          className="mt-4"
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

        {/* <TextField
          label="Brand"
          name="brand"
          fullWidth
          margin="dense"
          value={product.brand}
          onChange={handleChange}
        /> */}
        {/* <FormControl fullWidth margin="normal">
          <InputLabel id="brand-label">Brand</InputLabel>
          <Select
            labelId="brand-label"
            id="brand"
            name="brandId"
            value={product.brandId}
            onChange={(e) => setProduct({ ...product, brandId: e.target.value })}
            label="Brand"
          >
            {brands.map((brand) => (
              <MenuItem key={brand.id} value={brand.id}>
                {brand.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Catagory"
          name="type"
          fullWidth
          margin="dense"
          value={product.categoryId}
          onChange={handleChange}
        /> */}
        <TextField
          select
          label="Select a brand"
          name="brandId"
          fullWidth
          margin="normal"
          value={product.brandId}
          onChange={(e) => setProduct({ ...product, brandId: e.target.value })}
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
          onChange={(e) => setProduct({ ...product, categoryId: e.target.value })}
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
        {/* <TextField
          label="Status (Active/Inactive)"
          name="status"
          fullWidth
          margin="dense"
          value={product.status}
          onChange={handleChange}
        /> */}
        <TextField
          select
          label="Select status"
          name="status"
          fullWidth
          margin="normal"
          value={product.status}
          onChange={(e) => setProduct({ ...product, status: e.target.value })}
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
