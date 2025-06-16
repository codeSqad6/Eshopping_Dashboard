// views/pages/RedirectToLogin.js
import React from 'react'
import { Navigate } from 'react-router-dom'

const RedirectToLogin = () => {
  return <Navigate to="/login" />
}

export default RedirectToLogin
