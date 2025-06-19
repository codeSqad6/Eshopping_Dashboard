// import React from 'react'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './styleBanner.css'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material'

import { useNavigate } from 'react-router-dom'
import AddBannerDialog from '../Add_Banner/AddBannerDialog' // تأكد من المسار الصحيح
import EditBannerDialog from '../Edit_Banner/EditBannerDialog ' // تأكد من المسار الصحيح
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// import '../dialog form/UserFormDialog' // استدعاء الـ Dialog
import Category from '../../catagory/main_catagory/Category'
import DeleteBannerDialog from '../delete_Banner/DeleteDialogBanner'

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
  const [BannerToDelete, setBannerToDelete] = useState(null)
  const [selectedBanner, setSelectedBanner] = useState(null)
  // const initialBanners = [
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

  const [Banners, setBanners] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const totalPages = Math.ceil(Banners.length / itemsPerPage)
  const indexOfLast = currentPage * itemsPerPage
  const indexOfFirst = indexOfLast - itemsPerPage
  const currentBanners = Banners.slice(indexOfFirst, indexOfLast)
 useEffect(() => {
  const fetchBanners = async () => {
    try {
      const token = sessionStorage.getItem('token') 
      const response = await axios.get('http://test.smartsto0re.shop/api/Banner', {
        headers: {
          Authorization: `Bearer ${token}`, 
               },
      })

      setBanners(response.data) 
    } catch (error) {
      console.error('❌ Error fetching Banners:', error)
      toast.error('Failed to bring the Banners.')
    }
  }

  fetchBanners()
}, [])

  const handleAddBanners = (newBanner) => {
  setBanners((prevBanners) => [...prevBanners, newBanner])
}


  const handleEditBanners = (updatedBanner) => {
    setBanners(Banners.map((b) => (b.id === updatedBanner.id ? updatedBanner : b)))
  }
const handleDeleteBanners = (deletedId) => {
  setBanners((prev) => prev.filter((b) => b.id !== deletedId))
  setDeleteDialogOpen(false)
  setBannerToDelete(null)
}



  console.log(currentBanners, 'currentBanners')

  return (
    <div className="container">
      <div className="header">
        <p>Add a New Banners</p>
        <Button variant="contained" color="primary" onClick={() => setDialogOpen(true)}>
          ADD THE Banners
        </Button>
      </div>
      <table className="Banners_table">
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
          {currentBanners.map((b) => (
            <tr key={b.id}>
              <td>
                <img className="image" src={`http://test.smartsto0re.shop${b.imageUrl}`} alt={b.name} />
              </td>
              <td>{b.title}</td>
              <td>{b.nameAr}</td>
              <td>
                <span className={b.isActive === true ? 'active' : 'inactive'}>{b.isActive ? 'Active' : 'Inactive'}</span>
              </td>
              <td>
                <button
                  className="button editButton"
                  onClick={() => {
                    setSelectedBanner(b)
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
                    setBannerToDelete(b)
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
      <AddBannerDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSave={handleAddBanners}
      />
      <EditBannerDialog
        open={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onSave={handleEditBanners}
        initialData={selectedBanner}
      />
    <DeleteBannerDialog
  open={deleteDialogOpen}
  className="delete-dialog"
  onClose={() => setDeleteDialogOpen(false)}
  onConfirm={handleDeleteBanners} 
  Banner={BannerToDelete}
/>

    </div>
  )
}

export default App
