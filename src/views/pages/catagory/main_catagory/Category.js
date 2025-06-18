// import React, { useEffect, useState } from 'react'
// import axios from 'axios'
// import './Catagory_style.css'
// import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material'
// import './Category'
// import { useNavigate } from 'react-router-dom'
// import AddCatagoryDialog from '../Add_Catagory/AddCatagoryDialog'
// import EditCatagoryDialog from '../Edit_Catagory/EditCatagoryDialog'
// import { toast } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css'
// // import '../dialog form/UserFormDialog' // استدعاء الـ Dialog
// // import Category from '../../catagory/Category'
// import DeleteCatagoryDialog from '../delete_catagory/DeleteCatagoryDialog'

// function App() {
//   const navigate = useNavigate()

//   const [dialogOpen, setDialogOpen] = useState(false)
//   const [isEditOpen, setIsEditOpen] = useState(false)
//   const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
//   const [CatagoryToDelete, setCatagoryToDelete] = useState(null)
//   const [selectedCatagory, setSelectedCatagory] = useState(null)

//   const [Catagories, setCatagories] = useState([])
//   const [currentPage, setCurrentPage] = useState(1)
//   const itemsPerPage = 5

//   const totalPages = Math.ceil(Catagories?.length / itemsPerPage)
//   const indexOfLast = currentPage * itemsPerPage
//   const indexOfFirst = indexOfLast - itemsPerPage
//   const currentCatagories = Catagories?.slice(indexOfFirst, indexOfLast)
//   useEffect(() => {
//     const fetchCatagories = async () => {
//       try {
//         const token = sessionStorage.getItem('token')
//         const response = await axios.get('http://test.smartsto0re.shop/api/Categories', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         })

//         setCatagories(response.data)
//       } catch (error) {
//         console.error('❌ Error fetching catagories:', error)
//         toast.error('Failed to bring the catagories.')
//       }
//     }

//     fetchCatagories()
//   }, [])

//   const handleAddCatagory = (newCatagory) => {
//     setCatagories((prevCatagory) => [...prevCatagory, newCatagory])
//   }

//   const handleEditCatagories = (updatedCatagory) => {
//     setCatagories(Catagories?.map((b) => (b.id === updatedCatagory.id ? updatedCatagory : b)))
//   }
//   const handleDeleteCatagories = (deletedId) => {
//     setCatagories((prev) => prev.filter((b) => b.id !== deletedId))
//     setDeleteDialogOpen(false)
//     setCatagories(null)
//   }

//   console.log(currentCatagories, 'currentCatagories')

//   return (
//     <div className="container">
//       <div className="header">
//         <p>Add a New Catagories</p>
//         <Button variant="contained" color="primary" onClick={() => setDialogOpen(true)}>
//           ADD THE Catagories
//         </Button>
//       </div>
//       <table className="Catagory_table">
//         <thead>
//           <tr>
//             <th>Image</th>
//             <th>NameEn</th>
//             <th>NameAr</th>
//             <th>Status</th>
//             <th>Edit</th>
//             <th>Delete</th>
//           </tr>
//         </thead>
//         <tbody>
//           {currentCatagories?.map((b) => (
//             <tr key={b.id}>
//               <td>
//                 <img
//                   className="image"
//                   src={`http://test.smartsto0re.shop${b.imageUrl}`}
//                   alt={b.name}
//                 />
//               </td>
//               <td>{b.name}</td>
//               <td>{b.nameAr}</td>
//               <td>
//                 <span className={b.isActive === true ? 'active' : 'inactive'}>
//                   {b.isActive ? 'Active' : 'Inactive'}
//                 </span>
//               </td>
//               <td>
//                 <button
//                   className="button editButton"
//                   onClick={() => {
//                     setSelectedCatagory(b)
//                     setIsEditOpen(true)
//                   }}
//                 >
//                   <i className="fas fa-edit"></i>
//                 </button>
//               </td>
//               <td>
//                 <button
//                   className="button deleteButton"
//                   onClick={() => {
//                     setCatagoryToDelete(b)
//                     setDeleteDialogOpen(true)
//                   }}
//                 >
//                   <i className="fas fa-trash"></i>
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <div className="pagination">
//         <button
//           className="pageBtn"
//           onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//           disabled={currentPage === 1}
//         >
//           {'<<'}
//         </button>

//         {[...Array(totalPages)]?.map((_, index) => (
//           <button
//             key={index}
//             className={`pageBtn ${currentPage === index + 1 ? 'pageBtnActive' : 'pageBtnInactive'}`}
//             onClick={() => setCurrentPage(index + 1)}
//           >
//             {index + 1}
//           </button>
//         ))}

//         <button
//           className="pageBtn"
//           onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
//           disabled={currentPage === totalPages}
//         >
//           {'>'}
//         </button>
//       </div>
//       <AddCatagoryDialog
//         open={dialogOpen}
//         onClose={() => setDialogOpen(false)}
//         onSave={handleAddCatagory}
//       />
//       <EditCatagoryDialog
//         open={isEditOpen}
//         onClose={() => setIsEditOpen(false)}
//         onSave={handleEditCatagories}
//         initialData={selectedCatagory}
//       />
//       <DeleteCatagoryDialog
//         open={deleteDialogOpen}
//         className="delete-dialog"
//         onClose={() => setDeleteDialogOpen(false)}
//         onConfirm={handleDeleteCatagories}
//         Catagory={CatagoryToDelete}
//       />
//     </div>
//   )
// }

// export default App

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Catagory_style.css'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import AddCatagoryDialog from '../Add_Catagory/AddCatagoryDialog'
import EditCatagoryDialog from '../Edit_Catagory/EditCatagoryDialog'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import DeleteCatagoryDialog from '../delete_catagory/DeleteCatagoryDialog'

function App() {
  const navigate = useNavigate()

  const [dialogOpen, setDialogOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [catagoryToDelete, setCatagoryToDelete] = useState(null)
  const [selectedCatagory, setSelectedCatagory] = useState(null)

  const [catagories, setCatagories] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const totalPages = Math.ceil(catagories.length / itemsPerPage)
  const indexOfLast = currentPage * itemsPerPage
  const indexOfFirst = indexOfLast - itemsPerPage
  const currentCatagories = catagories.slice(indexOfFirst, indexOfLast)

  useEffect(() => {
    const fetchCatagories = async () => {
      try {
        const token = sessionStorage.getItem('token')
        const response = await axios.get('http://test.smartsto0re.shop/api/Categories', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setCatagories(response.data)
      } catch (error) {
        console.error('❌ Error fetching catagories:', error)
        toast.error('Failed to bring the categories.')
      }
    }
    fetchCatagories()
  }, [])

  const handleAddCatagory = (newCatagory) => {
    setCatagories((prevCatagories) => [...prevCatagories, newCatagory])
  }

  const handleEditCatagories = (updatedCatagory) => {
    setCatagories((prevCatagories) =>
      prevCatagories.map((cat) => (cat.id === updatedCatagory.id ? updatedCatagory : cat)),
    )
  }

  const handleDeleteCatagories = (deletedId) => {
    setCatagories((prevCatagories) => prevCatagories.filter((cat) => cat.id !== deletedId))
    setDeleteDialogOpen(false)
    setCatagoryToDelete(null)
  }

  return (
    <div className="container">
      <div className="header">
        <p>Add a New Category</p>
        <Button variant="contained" color="primary" onClick={() => setDialogOpen(true)}>
          ADD CATEGORY
        </Button>
      </div>

      <table className="Catagory_table">
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
          {currentCatagories.map((cat) => (
            <tr key={cat.id}>
              <td>
                <img
                  className="image"
                  src={`http://test.smartsto0re.shop${cat.imageUrl}`}
                  alt={cat.name}
                />
              </td>
              <td>{cat.name}</td>
              <td>{cat.nameAr}</td>
              <td>
                <span className={cat.isActive ? 'active' : 'inactive'}>
                  {cat.isActive ? 'Active' : 'Inactive'}
                </span>
              </td>
              <td>
                <button
                  className="button editButton"
                  onClick={() => {
                    setSelectedCatagory(cat)
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
                    setCatagoryToDelete(cat)
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

      <AddCatagoryDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSave={handleAddCatagory}
      />
      <EditCatagoryDialog
        open={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onSave={handleEditCatagories}
        productData={selectedCatagory}
      />
      <DeleteCatagoryDialog
        open={deleteDialogOpen}
        className="delete-dialog"
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={() => handleDeleteCatagories(catagoryToDelete?.id)}
        Catagory={catagoryToDelete}
      />
    </div>
  )
}

export default App
