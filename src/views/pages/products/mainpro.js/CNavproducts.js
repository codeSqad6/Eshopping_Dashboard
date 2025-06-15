// import React from 'react'
import React, { useState } from 'react'
import './styleproduct.css'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material'
import './CNavproducts'
import { useNavigate } from 'react-router-dom'
import ProductFormDialog from '../dialog form/ProductFormDialog' // تأكد من المسار الصحيح
import EditProductDialog from '../dialog form/EditFormDialog ' // تأكد من المسار الصحيح
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// import '../dialog form/UserFormDialog' // استدعاء الـ Dialog
import Category from './../../catagory/Category'
import DeleteConfirmDialog from '../delete_dialog/DeleteDialog'

// const CNavproducts = () => {
//   return (
//     <div className="flex">
//       <div className="flex-1 p-6">
//         {/* <h1 className="text-2xl font-bold">Welcome TO Products page</h1> */}

//       </div>
//     </div>
//   )
// }

// export default CNavproducts
function App() {
  const navigate = useNavigate()
  // const [dialogOpen, setDialogOpen] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [productToDelete, setProductToDelete] = useState(null)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const initialProducts = [
    {
      id: 1,
      nameEn: 'Laptop',
      nameAr: 'لابتوب',
      image:
        'https://th.bing.com/th/id/R.3a1a002c3944586115b5e3738f4c652c?rik=L%2bK%2bwiZM7VfOnw&pid=ImgRaw&r=0',
      brandId: 1,
      categoryId: 2,
      price: 1200,
      discount: 10,
      descriptionEn: 'descriptionEn ',
      descriptionAr: 'descriptionAr',
      status: 'Active',
    },
    {
      id: 2,
      nameEn: 'T-Shirt',
      nameAr: 'تيشيرت',
      image:
        'https://th.bing.com/th/id/R.b3c5e724216335fad832b93348f497f2?rik=Yys2kv6q5hiTYg&riu=http%3a%2f%2fimg.ltwebstatic.com%2fimages%2fpi%2f201707%2f2f%2f14990734971273770034.jpg&ehk=qug4n1YyxWOcbqD2HpJ81jNA%2bx19D5zQgMoliuvlS08%3d&risl=&pid=ImgRaw&r=0',
      brandId: 2,
      categoryId: 1,

      price: 50,
      discount: 5,
      descriptionEn: 'descriptionEn ',
      descriptionAr: 'descriptionAr',
      status: 'Inactive',
    },
    {
      id: 3,
      nameEn: 'Laptop',
      nameAr: 'لابتوب',
      image:
        'https://th.bing.com/th/id/R.3a1a002c3944586115b5e3738f4c652c?rik=L%2bK%2bwiZM7VfOnw&pid=ImgRaw&r=0',
      brandId: 1,
      categoryId: 1,

      price: 1300,
      discount: 10,
      descriptionEn: 'descriptionEn ',
      descriptionAr: 'descriptionAr',
      status: 'Active',
    },
    {
      id: 4,
      nameEn: 'T-Shirt',
      nameAr: 'تيشيرت',
      image:
        'https://th.bing.com/th/id/R.b3c5e724216335fad832b93348f497f2?rik=Yys2kv6q5hiTYg&riu=http%3a%2f%2fimg.ltwebstatic.com%2fimages%2fpi%2f201707%2f2f%2f14990734971273770034.jpg&ehk=qug4n1YyxWOcbqD2HpJ81jNA%2bx19D5zQgMoliuvlS08%3d&risl=&pid=ImgRaw&r=0',
      brandId: 2,
      categoryId: 1,

      price: 100,
      descriptionEn: 'descriptionEn ',
      descriptionAr: 'descriptionAr',
      discount: 5,
      status: 'Inactive',
    },
    {
      id: 5,
      nameEn: 'Laptop',
      nameAr: 'لابتوب',
      image:
        'https://th.bing.com/th/id/R.3a1a002c3944586115b5e3738f4c652c?rik=L%2bK%2bwiZM7VfOnw&pid=ImgRaw&r=0',
      brandId: 1,
      categoryId: 2,

      price: 1400,
      discount: 10,
      descriptionEn: 'descriptionEn ',
      descriptionAr: 'descriptionAr',
      status: 'Active',
    },
    {
      id: 6,
      nameEn: 'T-Shirt',
      nameAr: 'تيشيرت',
      image:
        'https://th.bing.com/th/id/R.b3c5e724216335fad832b93348f497f2?rik=Yys2kv6q5hiTYg&riu=http%3a%2f%2fimg.ltwebstatic.com%2fimages%2fpi%2f201707%2f2f%2f14990734971273770034.jpg&ehk=qug4n1YyxWOcbqD2HpJ81jNA%2bx19D5zQgMoliuvlS08%3d&risl=&pid=ImgRaw&r=0',
      brandId: 2,
      categoryId: 1,

      price: 150,
      discount: 5,
      descriptionEn: 'descriptionEn ',
      descriptionAr: 'descriptionAr',
      status: 'Inactive',
    },
  ]

  const [products, setProducts] = useState(initialProducts)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const totalPages = Math.ceil(products.length / itemsPerPage)
  const indexOfLast = currentPage * itemsPerPage
  const indexOfFirst = indexOfLast - itemsPerPage
  const currentProducts = products.slice(indexOfFirst, indexOfLast)

  // const handleAddUser = (newUser) => {
  //   const newId = rows.length > 0 ? rows[rows.length ].id + 1 : 1
  //   setProducts([...products, { id: newId, ...newUser }])
  // }
  const handleAddProduct = (newProduct) => {
    const newId = products.length > 0 ? products[products.length - 1].id + 1 : 1
    setProducts([...products, { id: newId, ...newProduct }])
  }
  const handleEditProduct = (updatedProduct) => {
    setProducts(products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)))
  }

  const handleDeleteConfirm = () => {
    setProducts(products.filter((p) => p.id !== productToDelete.id))
    setDeleteDialogOpen(false)
    setProductToDelete(null)
    toast.success(' Product deleted successfully')
  }

  const brands = [
    { id: 1, name: 'Dell' },
    { id: 2, name: 'Nike' },
  ]
  const categories = [
    { id: 1, name: 'cat1' },
    { id: 2, name: 'cat2' },
  ]
  console.log(currentProducts, 'currentProducts')

  return (
    <div className="container">
      <div className="header">
        <p>Add a New Product</p>
        <Button variant="contained" color="primary" onClick={() => setDialogOpen(true)}>
          ADD THE PRODUCT
        </Button>
      </div>
      <table className="product_table">
        <thead>
          <tr>
            <th>Image</th>
            <th>NameEn</th>
            <th>NameAr</th>
            <th>Brand</th>
            <th>Category</th>
            <th>Price$</th>
            <th>Discount%</th>
            <th>Status</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map((p) => (
            <tr key={p.id}>
              <td>
                <img className="image" src={p.image} alt={p.name} />
              </td>
              <td>{p.nameEn}</td>
              <td>{p.nameAr}</td>
              <td>{brands.find((b) => b.id === p.brandId)?.name || 'N/A'}</td>
              <td>{categories.find((c) => c.id === p.categoryId)?.name || 'N/A'}</td>
              <td>{p.price}</td>
              <td>{p.discount}</td>
              <td>
                <span className={p.status === 'Active' ? 'active' : 'inactive'}>{p.status}</span>
              </td>
              <td>
                <button
                  className="button editButton"
                  onClick={() => {
                    setSelectedProduct(p)
                    setIsEditOpen(true)
                  }}
                >
                  <i className="fas fa-edit"></i>
                </button>
              </td>
              <td>
                <button
                  className="button deleteButton"
                  onClick={() => {
                    setProductToDelete(p)
                    setDeleteDialogOpen(true)
                  }}
                >
                  <i className="fas fa-trash"></i>
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
          {'<<'}
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
      {/* Dialog مستقل لكن مدمج
      <UserFormDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSave={handleAddUser}
      /> */}
      <ProductFormDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSave={handleAddProduct}
      />
      <EditProductDialog
        open={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onSave={handleEditProduct}
        initialData={selectedProduct}
      />
      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        product={productToDelete}
      />
    </div>
  )
}

export default App
