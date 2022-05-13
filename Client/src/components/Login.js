import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {
  Form, 
  FormGroup,
  Label,
  Input,
  Button
} from 'reactstrap'
import { useNavigate } from 'react-router-dom';
import {
  FaUser
} from 'react-icons/fa'

export const Login = () => {

  const [ email, setEmail ] = useState('');
  const [ password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e)=>{
    
    e.preventDefault();

    axios.post('/api_v1/auth/login', {
      email:email,
      password
    })
    .then((res)=>{
      if( res.status === 200 ){
        navigate('/index');
      }else{
        console.log("Login error")
      }
      console.log(res)
    })   
    .catch( (error)=>{
      console.log("error :");
      console.log(error);
    } )

  }


  return (
    <section>
      <div className='auth-bg' >
        <Form className='auth-info' onSubmit={handleSubmit} >
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
              value={password} 
              placeholder="Enter Password"  
              required            
            />
          </FormGroup>
          <Button type='submit' >Login</Button>
        </Form>


      </div>

    </section>
  )
}
