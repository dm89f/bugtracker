import React from 'react'
import {
  Outlet
} from 'react-router-dom'


export const Auth = () => {
  return (
    <section>
      <div>Auth</div>
     <Outlet/> 
    </section> 
  )
}
