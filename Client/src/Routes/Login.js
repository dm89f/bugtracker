import React, { useEffect, useState } from 'react'

import axios from 'axios';
import {  Form, FormGroup, Label, Input, Button } from 'reactstrap'
import { useNavigate, Link } from 'react-router-dom';
import {  FaUser } from 'react-icons/fa'
import { toast, ToastContainer } from 'react-toastify';

const { useGetDev, useGetDevLogin } = require('../contexts/UserContext')


function Login() {

  const devInfo = useGetDev();
  const reqDevLogin =useGetDevLogin();

  const [ email, setEmail ] = useState('');
  const [ password, setPassword] = useState('');
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

      console.log(error);
      setEmail("");
      setPassword("");

    }

   

  }



  return (
    <section>
        <div className='auth-bg light ' >
          <Form className='auth-info card shadow' onSubmit={handleSubmit} >
            <h3 className='text-center' > <FaUser/> Login </h3>
            <FormGroup>
              <Label htmlFor="email">
                Email 
              </Label>
              <Input
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
                onChange={ (e)=>{ setPassword(e.target.value) } }
                type='password'
                value={password} 
                placeholder="Enter Password"  
                required            
              />
            </FormGroup>
            <Button className='btn primary' type='submit' >Login</Button>
            <div className='mt-3'>
                <p className='text-secondary'>
                  Dont Have an account Sign Up {"   "}
                  <Link className='text-primary' to={"/register"} >here</Link>
                </p>
            </div>
          </Form>
        </div>

    </section>
  )
}

export default Login