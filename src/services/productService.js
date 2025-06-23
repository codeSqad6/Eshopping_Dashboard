import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const BASE_URL = import.meta.env.VITE_API_BASE_URL

export const getAllProducts = async () => {
  try {
    const token = sessionStorage.getItem('token')

    const response = await axios.get(`${BASE_URL}/Products`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

  return Array.isArray(response.data?.data) ? response.data.data : []
  } catch (error) {
    toast.error(error.response?.data || error.message)
    return [] // fallback empty array
  }
}
