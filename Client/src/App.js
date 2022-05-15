import axios from "axios";
import React, { useEffect, useState } from "react";
import {Auth} from './components/Auth';
import {Login} from './components/Login';
import {Register} from './components/Register';
import {IndexPage} from './components/IndexPage'
import {Project} from './components/Project'
import { Projects } from './components/Projects'
import{
  BrowserRouter,
  Routes,
  Route,
  useNavigate
} from 'react-router-dom'

function App() {

  const [ isLoggedIn, setIsLoggedIn ] = useState(false);

  const checkdevAuth = ()=>{
    axios.get('/api_v1/auth/is_loggedin')
    .then((res)=>{
      if(res.status === 200)  setIsLoggedIn(true);
    })
    .catch((err)=>{
      setIsLoggedIn(false);
    })
  }
  async function reqLogout(){
    try{
      const res = await axios.post('/api_v1/auth/logout')
      console.log(res);
    }catch(err){
      console.log(err);
    }
    
  }

  checkdevAuth();

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/auth' element={<Auth isLoggedIn={isLoggedIn} />} >
        <Route path='login' element={<Login/>} />
        <Route path='register' element={<Register/>} />
      </Route>
      <Route path='/' element={<IndexPage isLoggedIn={isLoggedIn} reqLogout={reqLogout} />} >
        <Route path="index" element={<Projects/>} />
        <Route path='project' isLoggedIn={isLoggedIn}>
          <Route path=":id" index element={<Project/>} />
        </Route>
      </Route>     
    </Routes>
  </BrowserRouter>
  );
}

export default App;
