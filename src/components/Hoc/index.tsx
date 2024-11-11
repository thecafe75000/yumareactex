import React from 'react'
import { Navigate } from 'react-router-dom'


const withAuth = (Comp:React.FC) => {
   return () => (localStorage.getItem('token') ? <Comp /> : <Navigate to='/login' />)
}

export default withAuth