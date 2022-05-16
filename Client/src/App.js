import axios from "axios";
import React, { useEffect, useState } from "react";

import AddressNotFound from './Routes/AddressNotFound'
import Login from './Routes/Login'
import Dashboard from './Routes/Dashboard'
import Projects from './Routes/Projects';
import Project from "./Routes/Project";
import Register from "./Routes/Register";
import Tickets from "./Routes/Tickets";
import AdminDashboard from "./Routes/AdminDashboard";

import{
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'



function App() {

  const [ isLoggedIn, setIsLoggedIn ] = useState(false);

  useEffect(()=>{    
    axios.get('/api_v1/auth/is_logged_in')
      .then((res)=>{
        if(res.status === 200 ) {
          setIsLoggedIn(true);
        }
      })
      .catch((err)=>{
        setIsLoggedIn(false);
      })
  },[])

  async function reqLogout(){
    try{
      const res = await axios.post('/api_v1/auth/logout');
      if( res.status === 200 ){
        setIsLoggedIn(false);
      }
    }catch(err){
      console.log(err);
    }
    
  }


  return (
      <BrowserRouter>
      <Routes>
        <Route path='/'  >
          <Route path='login' element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}  />
          <Route path='register' element={ <Register /> }  />
        </Route>
        
        <Route  path="/dev" element={<Dashboard isLoggedIn={isLoggedIn} reqLogout={reqLogout}  />}>
          <Route path="dashboard" element={<Projects/>} />
          <Route path='tickets' element={<Tickets/>} />
          <Route path="project/:id" element={<Project/>}  />
          <Route path="admin" element={<AdminDashboard/>} / >
        </Route>
        <Route path="*" element={<AddressNotFound/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
