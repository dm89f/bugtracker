import axios from 'axios';
import React, { useEffect, useState } from 'react'

export const Login = () => {

  const [ username, setUsername ] = useState('');
  const [ password, setPassword] = useState('');

  const handleSubmit = (e)=>{
    
    e.preventDefault();

    axios.post('/api/auth/login', {
      username,
      password
    })
    .then((res)=>{
      console.log(res.data)
    })   
    .catch( (error)=>{
      console.log("error :");
      console.log(error);
    } )

  }


  return (
    <section>
      <div>
        <form onSubmit={handleSubmit} >
          <div>
            <label htmlFor='username'>Username</label>
            <input 
              onChange={ (e)=>{ setUsername(e.target.value) } }
              type='email' 
              name="username" 
              value={username} 
            />
          </div>
          <div>
            <label>Password</label>
            <input 
              onChange={ (e)=>{ setPassword(e.target.value) } }
              type="password" 
              name="password" 
              value={password} 
            />
          </div>

          <button type='submit' >Login</button>

        </form>
      </div>

    </section>
  )
}
