import React, { useEffect } from 'react'
import {
  Outlet, useNavigate
} from 'react-router-dom'


export const Auth = ({isLoggedIn}) => {
  
  const navigate = useNavigate();

  useEffect(()=>{
    if(!isLoggedIn){
      navigate('/login');
    }else{
      navigate('/dashboard');
    }
  },[isLoggedIn]);

  return (
    <section>
      <h4> Auth { isLoggedIn? "Logged in" : "not Logged in"} </h4>
      <Outlet/> 
    </section> 
  )
}
