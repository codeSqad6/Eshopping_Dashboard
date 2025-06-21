// import React from 'react'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './styleDiscounts.css'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material'

import { useNavigate } from 'react-router-dom'
import AddDiscountDialog from '../Add_Discounts/AddDiscountsDialog' // تأكد من المسار الصحيح
import EditDiscountDialog from '../Edit_Discounts/EditDiscountsDialog ' // تأكد من المسار الصحيح
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// import '../dialog form/UserFormDialog' // استدعاء الـ Dialog
import Category from '../../catagory/main_catagory/Category'
import DeleteDiscountDialog from '../delete_Discounts/DeleteDialogDiscounts'

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
  const [DiscountToDelete, setDiscountToDelete] = useState(null)
  const [selectedDiscount, setSelectedDiscount] = useState(null)


  const [Discounts, setDiscounts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const totalPages = Math.ceil(Discounts.length / itemsPerPage)
  const indexOfLast = currentPage * itemsPerPage
  const indexOfFirst = indexOfLast - itemsPerPage
  const currentDiscounts = Discounts.slice(indexOfFirst, indexOfLast)
 useEffect(() => {
  const fetchDiscounts = async () => {
    try {
      const token = sessionStorage.getItem('token')
      const response = await axios.get('http://test.smartsto0re.shop/api/Discounts', {
        headers: {
          Authorization: `Bearer ${token}`,
               },
      })

      setDiscounts(response.data)
    } catch (error) {
      console.error('❌ Error fetching Discounts:', error)
      toast.error('Failed to bring the Discounts.')
    }
  }

  fetchDiscounts()
}, [])

  const handleAddDiscounts = (newDiscount) => {
  setDiscounts((prevDiscounts) => [...prevDiscounts, newDiscount])
}


  const handleEditDiscounts = (updatedDiscount) => {
    setDiscounts(Discounts.map((b) => (b.id === updatedDiscount.id ? updatedDiscount : b)))
  }
const handleDeleteDiscounts = (deletedId) => {
  setDiscounts((prev) => prev.filter((b) => b.id !== deletedId))
  setDeleteDialogOpen(false)
  setDiscountToDelete(null)
}



  console.log(currentDiscounts, 'currentDiscounts')

  return (
    <div className="container">
      <div className="header">
        <p>Add a New Discounts</p>
        <Button variant="contained" color="primary" onClick={() => setDialogOpen(true)}>
         Add Discount
        </Button>
      </div>
      <table className="Discounts_table">
        <thead>
          <tr>
            <th>NameEn</th>
            {/* <th>NameAr</th> */}
            <th>Discount Code </th>
            <th>Discount Percentage</th>
            <th>Status</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {currentDiscounts.map((b) => (
            <tr key={b.id}>
              <td>{b.name}</td>
              {/* <td>{b.nameAr}</td> */}
                <td>{b.discountCode}</td>
                  <td>{b.discountPercentage}</td>
              <td>
                <span className={b.isActive === true ? 'active' : 'inactive'}>{b.isActive ? 'Active' : 'Inactive'}</span>
              </td>
              <td>
                <button
                  className="button editButton"
                  onClick={() => {
                    setSelectedDiscount(b)
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
                    setDiscountToDelete(b)
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
      <AddDiscountDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSave={handleAddDiscounts}
      />
      <EditDiscountDialog
        open={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onSave={handleEditDiscounts}
        initialData={selectedDiscount}
      />
    <DeleteDiscountDialog
  open={deleteDialogOpen}
  className="delete-dialog"
  onClose={() => setDeleteDialogOpen(false)}
  onConfirm={handleDeleteDiscounts}
  Discount={DiscountToDelete}
/>

    </div>
  )
}

export default App
