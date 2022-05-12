import axios from 'axios';
import React, { useState } from 'react'

export const Register = () => {

  const [ firstName, setFirstName ] = useState('');
  const [ lastName, setLastName ] = useState('');
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('');
  const [ confPassword, setConfPassword ] = useState('');
  const [ secQstn, setSecQstn] = useState('');
  const [ secAns, setSecAns ] =useState('');
  const [phoneNo, setPhoneNo] = useState('');

  const handleSubmit = async (e)=>{

      e.preventDefault();
      axios.post( '/api_v1/auth/register',{      
      first_name:firstName,
      last_name:lastName,
      email:email,
      password:password,
      sec_qstn:secQstn,
      sec_ans:secAns,
      phone_no:phoneNo
      
    } ).then( (res)=>{
      console.log(res);
    } ).catch( (err)=>{
      console.log(err);
    } )


  }

  return (
    <section>
      <h3>Register</h3>
      <form onSubmit={handleSubmit} >
        <div>
          <label htmlFor='first_name' >First Name : </label>
          <input 
            type='text' 
            name='first_name' 
            id="first_name"
            value={firstName}
            onChange={(e)=>{ setFirstName(e.target.value) }}
            ></input>
        </div>
        <div>
          <label htmlFor='last_name' >Last Name : </label>
          <input 
            type='text' 
            id="last_name" 
            name="last_name" 
            value = {lastName}
            onChange = { (e)=>{ setLastName(e.target.value) } }
          ></input>
        </div>
        <div>
          <label htmlFor='email'>Email : </label>
          <input 
          type='email' 
          id='email'
          value = { email }
          onChange = { (e)=>{ setEmail(e.target.value) } }
        ></input>
        </div>
        <div>
          <label htmlFor='phone_no'>Phone No : </label>
          <input 
          type='text' 
          id='phone_no'
          value = { phoneNo }
          onChange = { (e)=>{ setPhoneNo(e.target.value) } }
          ></input>
        </div>
        <div>
          <label htmlFor='password'> Password</label>
          <input 
            id='password' 
            type='password' 
            value = {password}
            onChange={ (e)=>{ setPassword(e.target.value) } }
          ></input>
        </div>
        <div>
          <label htmlFor='confirm_password'>Confirm Password</label>
          <input 
            id='confirm_password' 
            type='password' 
            value = { confPassword }
            onChange = { (e)=>{ setConfPassword(e.target.value) } }
          ></input>
        </div>
        <div>
          <label htmlFor='sec_qstn' >
            Select secret question
          </label>
          <select 
            name='sec_qstn' 
            id='sec_qstn'
            value = { secQstn } 
            onChange={(e)=>{ setSecQstn(e.target.value) }} 
          >
            <option value=''  >----Select Secret Question----</option>
            <option value='What is your Pet Name' >What is your Pet Name</option>
            <option value='What is your native city' >What is your native city</option>
            <option value='What is your nick name' >What is your nick name</option>
          </select>
        </div>
        <div>
          <label htmlFor='sec_ans'>Secret Answer</label>
          <input 
            type="text"
            value = {secAns}
            onChange = { (e)=>{ setSecAns(e.target.value) } }
          ></input>
        </div>

        <button type='submit'>Register</button>

      </form>
    </section>
  )
}
