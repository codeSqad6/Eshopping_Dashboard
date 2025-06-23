import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const BASE_URL = import.meta.env.VITE_API_BASE_URL

export const login = async (userData) => {
  try {
    const response = await axios.post(`/api/Auth/login`, userData, {
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const token = response.data?.token
    if (token) {
      sessionStorage.setItem('token', token)
    }

    return response.data
  } catch (error) {
    toast.error(error.response?.data || error.message)
    throw error
  }
}
