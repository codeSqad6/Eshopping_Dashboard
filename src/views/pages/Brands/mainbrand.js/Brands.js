// import React from 'react'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './stylebrand.css'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material'
import './Brands'
import { useNavigate } from 'react-router-dom'
import AddBrandDialog from '../Add_Brand/AddBrandDialog' // تأكد من المسار الصحيح
import EditBrandDialog from '../Edit_Brand/EditBrandDialog ' // تأكد من المسار الصحيح
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// import '../dialog form/UserFormDialog' // استدعاء الـ Dialog
// import Category from '../../catagory/Category'
import DeleteBrandDialog from '../delete_brand/DeleteDialogbrand'

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
  const [BrandToDelete, setBrandToDelete] = useState(null)
  const [selectedBrand, setSelectedBrand] = useState(null)
  // const initialBrands = [
  //   {
  //     id: 1,
  //     nameEn: 'Laptop',
  //     nameAr: 'لابتوب',
  //     image:
  //       'https://th.bing.com/th/id/R.3a1a002c3944586115b5e3738f4c652c?rik=L%2bK%2bwiZM7VfOnw&pid=ImgRaw&r=0',
  //     descriptionEn: 'descriptionEn ',
  //     descriptionAr: 'descriptionAr',
  //     status: 'Active',
  //   },
  //   {
  //     id: 2,
  //     nameEn: 'T-Shirt',
  //     nameAr: 'تيشيرت',
  //     image:
  //       'https://th.bing.com/th/id/R.b3c5e724216335fad832b93348f497f2?rik=Yys2kv6q5hiTYg&riu=http%3a%2f%2fimg.ltwebstatic.com%2fimages%2fpi%2f201707%2f2f%2f14990734971273770034.jpg&ehk=qug4n1YyxWOcbqD2HpJ81jNA%2bx19D5zQgMoliuvlS08%3d&risl=&pid=ImgRaw&r=0',

  //     descriptionEn: 'descriptionEn ',
  //     descriptionAr: 'descriptionAr',
  //     status: 'Inactive',
  //   },
  //   {
  //     id: 3,
  //     nameEn: 'Laptop',
  //     nameAr: 'لابتوب',
  //     image:
  //       'https://th.bing.com/th/id/R.3a1a002c3944586115b5e3738f4c652c?rik=L%2bK%2bwiZM7VfOnw&pid=ImgRaw&r=0',

  //     descriptionEn: 'descriptionEn ',
  //     descriptionAr: 'descriptionAr',
  //     status: 'Active',
  //   },
  //   {
  //     id: 4,
  //     nameEn: 'T-Shirt',
  //     nameAr: 'تيشيرت',
  //     image:
  //       'https://th.bing.com/th/id/R.b3c5e724216335fad832b93348f497f2?rik=Yys2kv6q5hiTYg&riu=http%3a%2f%2fimg.ltwebstatic.com%2fimages%2fpi%2f201707%2f2f%2f14990734971273770034.jpg&ehk=qug4n1YyxWOcbqD2HpJ81jNA%2bx19D5zQgMoliuvlS08%3d&risl=&pid=ImgRaw&r=0',

  //     descriptionEn: 'descriptionEn ',
  //     descriptionAr: 'descriptionAr',
  //     discount: 5,
  //     status: 'Inactive',
  //   },
  //   {
  //     id: 5,
  //     nameEn: 'Laptop',
  //     nameAr: 'لابتوب',
  //     image:
  //       'https://th.bing.com/th/id/R.3a1a002c3944586115b5e3738f4c652c?rik=L%2bK%2bwiZM7VfOnw&pid=ImgRaw&r=0',

  //     descriptionEn: 'descriptionEn ',
  //     descriptionAr: 'descriptionAr',
  //     status: 'Active',
  //   },
  //   {
  //     id: 6,
  //     nameEn: 'T-Shirt',
  //     nameAr: 'تيشيرت',
  //     image:
  //       'https://th.bing.com/th/id/R.b3c5e724216335fad832b93348f497f2?rik=Yys2kv6q5hiTYg&riu=http%3a%2f%2fimg.ltwebstatic.com%2fimages%2fpi%2f201707%2f2f%2f14990734971273770034.jpg&ehk=qug4n1YyxWOcbqD2HpJ81jNA%2bx19D5zQgMoliuvlS08%3d&risl=&pid=ImgRaw&r=0',

  //     descriptionEn: 'descriptionEn ',
  //     descriptionAr: 'descriptionAr',
  //     status: 'Inactive',
  //   },
  // ]

  const [Brands, setBrands] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const totalPages = Math.ceil(Brands.length / itemsPerPage)
  const indexOfLast = currentPage * itemsPerPage
  const indexOfFirst = indexOfLast - itemsPerPage
  const currentBrands = Brands.slice(indexOfFirst, indexOfLast)
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const token = sessionStorage.getItem('token')
        const response = await axios.get('http://test.smartsto0re.shop/api/Brands', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        setBrands(response.data)
      } catch (error) {
        console.error('❌ Error fetching brands:', error)
        toast.error('Failed to bring the brands.')
      }
    }

    fetchBrands()
  }, [])

  const handleAddBrands = (newBrand) => {
    setBrands((prevBrands) => [...prevBrands, newBrand])
  }

  const handleEditBrands = (updatedBrand) => {
    setBrands(Brands.map((b) => (b.id === updatedBrand.id ? updatedBrand : b)))
  }
  const handleDeleteBrands = (deletedId) => {
    setBrands((prev) => prev.filter((b) => b.id !== deletedId))
    setDeleteDialogOpen(false)
    setBrandToDelete(null)
  }

  console.log(currentBrands, 'currentBrands')

  return (
    <div className="container">
      <div className="header">
        <p>Add a New Brands</p>
        <Button variant="contained" color="primary" onClick={() => setDialogOpen(true)}>
          ADD THE Brands
        </Button>
      </div>
      <table className="Brands_table">
        <thead>
          <tr>
            <th>Image</th>
            <th>NameEn</th>
            <th>NameAr</th>
            <th>Status</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {currentBrands.map((b) => (
            <tr key={b.id}>
              <td>
                <img
                  className="image"
                  src={`http://test.smartsto0re.shop${b.logoUrl}`}
                  alt={b.name}
                />
              </td>
              <td>{b.name}</td>
              <td>{b.nameAr}</td>
              <td>
                <span>{b.isActive ? 'Active' : 'Inactive'}</span>
              </td>
              <td>
                <button
                  className="button editButton"
                  onClick={() => {
                    setSelectedBrand(b)
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
                    setBrandToDelete(b)
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
      <AddBrandDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSave={handleAddBrands}
      />
      <EditBrandDialog
        open={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onSave={handleEditBrands}
        initialData={selectedBrand}
      />
      <DeleteBrandDialog
        open={deleteDialogOpen}
        className="delete-dialog"
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDeleteBrands}
        Brand={BrandToDelete}
      />
    </div>
  )
}

export default App
