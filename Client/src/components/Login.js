import axios from 'axios';
import React, {  useState } from 'react'
import {
  Form, 
  FormGroup,
  Label,
  Input,
  Button
} from 'reactstrap'
import { useNavigate, Link } from 'react-router-dom';
import {
  FaUser
} from 'react-icons/fa'
import { toast, ToastContainer } from 'react-toastify';

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
      
      setEmail("");
      setPassword("");
      toast.error( error.response.data.msg );

    } )

  }


  return (
    <section>
      <ToastContainer/>
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
              type='password'
              value={password} 
              placeholder="Enter Password"  
              required            
            />
          </FormGroup>
          <Button type='submit' >Login</Button>
          <div className='mt-3'>
              <p className='text-secondary'>
                Dont Have an account Sign Up {"   "}
                <Link className='text-primary' to={"/auth/register"} >here</Link>
              </p>
          </div>
        </Form>
      </div>

    </section>
  )
}
