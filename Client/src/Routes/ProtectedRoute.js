import React from 'react'
import { 
  Navigate
 } from 'react-router-dom'

import { IndexPage } from '../components/IndexPage'

export default function ProtectedRoute({isLoggedIn}) {
  return (
    isLoggedIn ? <IndexPage isLoggedIn={isLoggedIn}/>: <Navigate to="login"/>
  )
}
