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


const { useGetDev, useGetDevLogin, useGetDevLogout, useGetDevRegister } = require('./contexts/UserContext')


function App() {

  const devInfo = useGetDev();
  const reqDevLogin = useGetDevLogin();
  const reqDevLogout = useGetDevLogout();
  const reqDevRegister = useGetDevRegister();
  console.log(devInfo);

  return (
      <BrowserRouter>
      <Routes>
        <Route path='/'  >
          <Route path='login' 
            element={
              <Login devInfo={devInfo} 
                reqDevLogin={reqDevLogin} 
                reqDevLogout={reqDevLogout} 
              />
            }
          />
          <Route path='register' element={ <Register reqDevRegister={reqDevRegister} /> }  />
        </Route>
        
        <Route  path="/dev" element={<Dashboard devInfo={devInfo} reqDevLogout={reqDevLogout} />}>
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
