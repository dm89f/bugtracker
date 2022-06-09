import React, { useState } from 'react'
import { Outlet } from 'react-router-dom';

import { useGetDev } from '../contexts/UserContext'

function AdminRoute() {
  const dev = useGetDev();


  return (
  
    <section>
      
      {
        dev&&dev.authorization!=='admin'? <div>404</div>:<Outlet/>
      }

    </section>
  
  )
}

export default AdminRoute