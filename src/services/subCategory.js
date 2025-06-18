import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const BASE_URL = import.meta.env.VITE_API_BASE_URL

export const getAllSubCategories = async () => {
  try {
    const token = sessionStorage.getItem('token')

    const response = await axios.get(`${BASE_URL}/SubCategories`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return response.data
  } catch (error) {
    toast.error(error.response?.data || error.message)
    throw error
  }
}
