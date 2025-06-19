// import React from 'react'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './styleSubCategories.css'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import AddsubCatDialog from '../Add_SubCategories/AddSubCategoriesDialog' // تأكد من المسار الصحيح
import EditsubCatDialog from '../Edit_SubCategories/EditSubCategoriesDialog ' // تأكد من المسار الصحيح
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// import '../dialog form/UserFormDialog' // استدعاء الـ Dialog
import Category from '../../catagory/main_catagory/Category'
import DeletesubCatDialog from '../delete_SubCategories/DeleteDialogSubCategories'


function App() {
  const navigate = useNavigate()
  // const [dialogOpen, setDialogOpen] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [subCatToDelete, setsubCatToDelete] = useState(null)
  const [selectedsubCat, setSelectedsubCat] = useState(null)
  // const initialsubCats = [
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

  const [subCats, setsubCats] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const totalPages = Math.ceil(subCats.length / itemsPerPage)
  const indexOfLast = currentPage * itemsPerPage
  const indexOfFirst = indexOfLast - itemsPerPage
  const currentsubCats = subCats.slice(indexOfFirst, indexOfLast)
 useEffect(() => {
  const fetchsubCats = async () => {
    try {
      const token = sessionStorage.getItem('token') 
      const response = await axios.get('http://test.smartsto0re.shop/api/SubCategories', {
        headers: {
          Authorization: `Bearer ${token}`, 
               },
      })

      setsubCats(response.data) 
    } catch (error) {
      console.error('❌ Error fetching subCats:', error)
      toast.error('Failed to bring the subCats.')
    }
  }

  fetchsubCats()
}, [])

  const handleAddsubCats = (newsubCat) => {
  setsubCats((prevsubCats) => [...prevsubCats, newsubCat])
}


  const handleEditsubCats = (updatedsubCat) => {
    setsubCats(subCats.map((s_C) => (s_C.id === updatedsubCat.id ? updatedsubCat : s_C)))
  }
const handleDeletesubCats = (deletedId) => {
  setsubCats((prev) => prev.filter((s_C) => s_C.id !== deletedId))
  setDeleteDialogOpen(false)
  setsubCatToDelete(null)
}



  console.log(currentsubCats, 'currentsubCats')

  return (
    <div className="container">
      <div className="header">
        <p>Add a New SubCategories</p>
        <Button variant="contained" color="primary" onClick={() => setDialogOpen(true)}>
          ADD THE subCats
        </Button>
      </div>
      <table className="subCats_table">
        <thead>
          <tr>
            <th>Image</th>
            <th>NameEn</th>
            {/* <th>NameAr</th> */}
            <th>Status</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {currentsubCats.map((s_C) => (
            <tr key={s_C.id}>
              <td>
                <img className="image" src={`http://test.smartsto0re.shop${s_C.imageUrl}`} alt={s_C.name} />
              </td>
              <td>{s_C.name}</td>
              {/* <td>{s_C.nameAr}</td> */}
              <td>
                <span className={s_C.isActive === true ? 'active' : 'inactive'}>{s_C.isActive ? 'Active' : 'Inactive'}</span>
              </td>
              <td>
                <button
                  className="button editButton"
                  onClick={() => {
                    setSelectedsubCat(s_C)
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
                    setsubCatToDelete(s_C)
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
      <AddsubCatDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSave={handleAddsubCats}
      />
      <EditsubCatDialog
        open={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onSave={handleEditsubCats}
        initialData={selectedsubCat}
      />
    <DeletesubCatDialog
  open={deleteDialogOpen}
  className="delete-dialog"
  onClose={() => setDeleteDialogOpen(false)}
  onConfirm={handleDeletesubCats} 
  subCat={subCatToDelete}
/>

    </div>
  )
}

export default App
