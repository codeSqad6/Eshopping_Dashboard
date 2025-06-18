
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './styleproduct.css'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  CircularProgress,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import ProductFormDialog from '../dialog form/ProductFormDialog'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import DeleteConfirmDialog from '../delete_dialog/DeleteDialog'
import { getAllProducts } from '../../../../services/productService'
import { getAllBrands } from '../../../../services/brandService'
import { getAllCategories } from '../../../../services/categoryService'
import { getAllSubCategories } from '../../../../services/subCategory'
import EditProductDialog from './../dialog form/EditFormDialog ';

function App() {
  const navigate = useNavigate()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [productToDelete, setProductToDelete] = useState(null)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [loading, setLoading] = useState({
    products: false,
    brands: false,
    categories: false,
    subCategories: false,
    add: false,
    edit: false,
    delete: false,
  })

  const [products, setProducts] = useState([])
  const [brands, setBrands] = useState([])
  const [categories, setCategories] = useState([])
  const [subCategories, setSubCategories] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const totalPages = Math.ceil(products.length / itemsPerPage)
  const indexOfLast = currentPage * itemsPerPage
  const indexOfFirst = indexOfLast - itemsPerPage
  const currentProducts = products.slice(indexOfFirst, indexOfLast)

  const fetchProducts = async () => {
    try {
      setLoading((prev) => ({ ...prev, products: true }))
      const data = await getAllProducts()
      setProducts(data)
    } catch (error) {
      console.error('Error fetching products:', error)
      toast.error('Failed to load products')
    } finally {
      setLoading((prev) => ({ ...prev, products: false }))
    }
  }

  const fetchBrands = async () => {
    try {
      setLoading((prev) => ({ ...prev, brands: true }))
      const data = await getAllBrands()
      setBrands(data)
    } catch (error) {
      console.error('Error fetching brands:', error)
    } finally {
      setLoading((prev) => ({ ...prev, brands: false }))
    }
  }

  const fetchCategories = async () => {
    try {
      setLoading((prev) => ({ ...prev, categories: true }))
      const data = await getAllCategories()
      setCategories(data)
    } catch (error) {
      console.error('Error fetching categories:', error)
    } finally {
      setLoading((prev) => ({ ...prev, categories: false }))
    }
  }

  const fetchSubCategories = async () => {
    try {
      setLoading((prev) => ({ ...prev, subCategories: true }))
      const data = await getAllSubCategories()
      setSubCategories(data)
    } catch (error) {
      console.error('Error fetching subCategories:', error)
    } finally {
      setLoading((prev) => ({ ...prev, subCategories: false }))
    }
  }

  useEffect(() => {
    fetchProducts()
    fetchBrands()
    fetchCategories()
    fetchSubCategories()
  }, [])

  const handleAddProduct = async (newProduct) => {
    try {
      setLoading((prev) => ({ ...prev, add: true }))
      setProducts((prevProducts) => [...prevProducts, newProduct])
    } finally {
      setLoading((prev) => ({ ...prev, add: false }))
    }
  }

  const handleEditProduct = async (updatedProduct) => {
    try {
      setLoading((prev) => ({ ...prev, edit: true }))
      setProducts(products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)))
    } finally {
      setLoading((prev) => ({ ...prev, edit: false }))
    }
  }

  const handleDeleteConfirm = async () => {
    if (!productToDelete?.id) {
      toast.error('No product selected for deletion')
      setDeleteDialogOpen(false)
      return
    }

    try {
      setLoading((prev) => ({ ...prev, delete: true }))
      const token = sessionStorage.getItem('token')
      if (!token) {
        toast.error('Authentication token not found')
        return
      }

      const productExists = products.some((p) => p.id === productToDelete.id)
      if (!productExists) {
        toast.error('Product not found in current list')
        setDeleteDialogOpen(false)
        setProductToDelete(null)
        return
      }

      const response = await axios.delete(
        `http://test.smartsto0re.shop/api/Products/${productToDelete.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      )

      if (response.status >= 200 && response.status < 300) {
        toast.success('Product deleted successfully')
        setProducts((prevProducts) => prevProducts.filter((p) => p.id !== productToDelete.id))
      } else {
        throw new Error(`Unexpected status code: ${response.status}`)
      }
    } catch (error) {
      console.error('Delete error:', error)
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        'Failed to delete product'
      toast.error(`Error: ${errorMessage}`)
    } finally {
      setLoading((prev) => ({ ...prev, delete: false }))
      setDeleteDialogOpen(false)
      setProductToDelete(null)
    }
  }

  return (
    <div className="container">
      <div className="header">
        <p>Add a New Product</p>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setDialogOpen(true)}
          disabled={loading.add}
        >
          {loading.add ? <CircularProgress size={24} color="inherit" /> : 'ADD THE PRODUCT'}
        </Button>
      </div>

      {loading.products ? (
        <div className="loading-container">
          <CircularProgress />
          <p>Loading products...</p>
        </div>
      ) : (
        <>
          <table className="product_table">
            <thead>
              <tr>
                <th>Image</th>
                <th>NameEn</th>
                <th>NameAr</th>
                <th>Brand</th>
                <th>Category</th>
                <th>Price$</th>
                <th>stock Quantity</th>
                <th>Status</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.map((p) => (
                <tr key={p.id}>
                  <td>
                    <img
                      className="image"
                      src={`http://test.smartsto0re.shop${p.imageUrls[0]}`}
                      alt={p.name}
                    />
                  </td>
                  <td>{p.name}</td>
                  <td>{p.nameAr}</td>
                  <td>{brands.find((b) => b.id == p.brandId)?.name || 'N/A'}</td>
                  <td>{categories.find((c) => c.id == p.categoryId)?.name || 'N/A'}</td>
                  <td>{p.price}</td>
                  <td>{p.stockQuantity}</td>
                  <td>
                    <span className={p.isActive === true ? 'active' : 'inactive'}>
                      {p.isActive === true ? 'active' : 'inactive'}
                    </span>
                  </td>
                  <td>
                    <button
                      className="button editButton"
                      onClick={() => {
                        setSelectedProduct(p)
                        setIsEditOpen(true)
                      }}
                      disabled={loading.edit}
                    >
                      {loading.edit && selectedProduct?.id === p.id ? (
                        <CircularProgress size={20} color="inherit" />
                      ) : (
                        <i className="fas fa-edit"></i>
                      )}
                    </button>
                  </td>
                  <td>
                    <button
                      className="button deleteButton"
                      onClick={() => {
                        setProductToDelete(p)
                        setDeleteDialogOpen(true)
                      }}
                      disabled={loading.delete}
                    >
                      {loading.delete && productToDelete?.id === p.id ? (
                        <CircularProgress size={20} color="inherit" />
                      ) : (
                        <i className="fas fa-trash"></i>
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pagination">
            <button
              className="pageBtn"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              {'<'}
            </button>

            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                className={`pageBtn ${currentPage === index + 1 ? 'pageBtnActive' : 'pageBtnInactive'}`}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}

            <button
              className="pageBtn"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              {'>'}
            </button>
          </div>
        </>
      )}

      <ProductFormDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSave={handleAddProduct}
        loading={loading.add}
      />

      <EditProductDialog
        open={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onSave={handleEditProduct}
        initialData={selectedProduct}
        loading={loading.edit}
      />

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        className="delete-dialog"
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        product={productToDelete}
        loading={loading.delete}
      />
    </div>
  )
}

export default App
