import React, { useEffect } from 'react'
import {
  Outlet, useNavigate
} from 'react-router-dom'


export const Auth = ({isLoggedIn}) => {
  
  const navigate = useNavigate();

  useEffect(()=>{
    if(!isLoggedIn){
      navigate('/auth/login');
    }else{
      navigate('/index');
    }
  },[isLoggedIn]);

  return (
    <section>
      <h4> Auth { isLoggedIn? "Logged in" : "not Logged in"} </h4>
      <Outlet/> 
    </section> 
  )
}
