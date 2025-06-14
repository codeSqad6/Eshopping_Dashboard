import React, { useState } from 'react'
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

const ProductFormDialog = ({ open, onClose, onSave }) => {
  const [product, setProduct] = useState({
    name: '',
    image: '',
    brandId: '',
    type: '',
    price: '',
    discount: '',
    status: '',
  })

  const brands = [
    { id: 1, name: 'Dell' },
    { id: 2, name: 'Nike' },
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setProduct((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = () => {
    if (product.name && product.price && product.image) {
      onSave(product)
      setProduct({
        name: '',
        image: '',
        brandId: '',
        type: '',
        price: '',
        discount: '',
        status: '',
      })
      onClose()
    } else {
      alert('Please fill required fields')
    }
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Product</DialogTitle>
      <DialogContent>
        <TextField
          label="Product Name"
          name="name"
          fullWidth
          margin="dense"
          value={product.name}
          onChange={handleChange}
        />
        <TextField
          label=""
          type="file"
          name="image"
          fullWidth
          margin="dense"
          value={product.image}
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
        <FormControl fullWidth margin="normal">
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
          value={product.type}
          onChange={handleChange}
        />
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
        <FormControl fullWidth margin="normal">
          <InputLabel id="status-label">Status</InputLabel>
          <Select
            labelId="status-label"
            id="status"
            value={product.status}
            onChange={(e) => setProduct({ ...product, status: e.target.value })}
            label="Status"
          >
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Inactive">Inactive</MenuItem>
          </Select>
        </FormControl>
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
