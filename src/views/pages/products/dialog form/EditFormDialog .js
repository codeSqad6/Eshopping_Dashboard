// components/EditProductDialog.js
import React, { useEffect, useState } from 'react'
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, Select, MenuItem, InputLabel, FormControl
} from '@mui/material'

const EditProductDialog = ({ open, onClose, onSave, initialData }) => {
  const [product, setProduct] = useState({
    name: '', image: '', brandId: '', type: '',
    price: '', discount: '', status: '',
  })

  const brands = [
    { id: 1, name: 'Dell' },
    { id: 2, name: 'Nike' },
  ]

  useEffect(() => {
    if (initialData) {
      setProduct(initialData)
    }
  }, [initialData])

  const handleChange = (e) => {
    const { name, value } = e.target
    setProduct((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = () => {
    if (product.name && product.price) {
      onSave(product)
      onClose()
    } else {
      alert('Please fill required fields')
    }
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Product</DialogTitle>
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
        label="Image URL" 
        name="image" 
        fullWidth margin="dense" 
        value={product.image} 
        onChange={handleChange} 
        />
        <FormControl fullWidth margin="normal">
          <InputLabel id="brand-label">Brand</InputLabel>
          <Select labelId="brand-label" name="brandId" value={product.brandId} onChange={handleChange} label="Brand">
            {brands.map((b) => <MenuItem key={b.id} value={b.id}>{b.name}</MenuItem>)}
          </Select>
        </FormControl>
        <TextField label="Category" name="type" fullWidth margin="dense" value={product.type} onChange={handleChange} />
        <TextField label="Price" name="price" type="number" fullWidth margin="dense" value={product.price} onChange={handleChange} />
        <TextField label="Discount (%)" name="discount" type="number" fullWidth margin="dense" value={product.discount} onChange={handleChange} />
        <FormControl fullWidth margin="normal">
          <InputLabel id="status-label">Status</InputLabel>
          <Select labelId="status-label" name="status" value={product.status} onChange={handleChange} label="Status">
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Inactive">Inactive</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">Save Changes</Button>
      </DialogActions>
    </Dialog>
  )
}

export default EditProductDialog
