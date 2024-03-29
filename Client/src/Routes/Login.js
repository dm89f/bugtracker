import React, { useEffect, useState } from 'react'

import axios from 'axios';
import {  Form, FormGroup, Label, Input, Button } from 'reactstrap'
import { useNavigate, Link } from 'react-router-dom';
import {  FaBug, FaUser } from 'react-icons/fa'
import { toast, ToastContainer } from 'react-toastify';

const { useGetDev, useGetDevLogin } = require('../contexts/UserContext')
const {useTheme} = require('../contexts/ThemeContext')

function Login() {

  const devInfo = useGetDev();
  const reqDevLogin =useGetDevLogin();
  const [ email, setEmail ] = useState('');
  const [ password, setPassword] = useState('');
  const darkTheme = useTheme();
  const navigate = useNavigate();

  useEffect(()=>{

    if(devInfo){
      alert("already logged in");
    }

  },[devInfo])

  
  const handleSubmit = async (e)=>{
    
    e.preventDefault();

    try{
      
      await reqDevLogin({email, password})
      navigate('/dev/dashboard')


    }catch(error){

      if( error.response ){
        
        toast.error(error.response.data.error_msg)
      
      }else{
        toast.error("Login error")
      }
      setEmail("");
      setPassword("");

    }

   

  }



  return (
    <section>
        <div className={`auth-bg light  ${darkTheme?"d-theme":""}`} >
          <Form className={`auth-info card shadow ${darkTheme?"d-theme":""}`} onSubmit={handleSubmit} >
            <h2 className='text-center' > <FaUser/> Login </h2>
            <FormGroup>
              <Label htmlFor="email">
                Email 
              </Label>
              <Input
                className={`${darkTheme?"d-theme":""}`}
                id="email"
                name="email"
                placeholder="Enter Your Email"
                type="email"
                onChange={ (e)=>{ setEmail(e.target.value) } }
                value={email}
                required 
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor='password'  >
                Password
              </Label>
              <Input
                className={`${darkTheme?"d-theme":""}`}
                onChange={ (e)=>{ setPassword(e.target.value) } }
                type='password'
                value={password} 
                placeholder="Enter Password"  
                required            
              />
            </FormGroup>
            <Button className={`btn primary ${darkTheme?"d-theme":""}`} type='submit' >Login</Button>
            <div className='mt-3'>
                <p className='text-secondary'>
                  Dont Have an account Sign Up {"   "}
                  <Link className='text-primary' to={"/register"} >here</Link>
                </p>
            </div>
            <div className='d-flex justify-content-center '>
              <div>
                <FaBug className='bug' size={'2em'} style={{color:'#ad0039'}}/> 
              </div>
              <h2 className='mx-2 bug-icon-text'>Bug Tracker</h2>
            </div>
          </Form>
        </div>

    </section>
  )
}

export default Login