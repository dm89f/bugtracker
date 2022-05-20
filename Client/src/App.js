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
// import { ThemeCtxProvider } from './contexts/ThemeContext'
// import {UserContextProvider} from './contexts/UserContext'

import{
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'


function App() {


  return (
      <BrowserRouter>
        <Routes>
          <Route path='/'  >
            <Route path='login' 
              element={ <Login /> }
            />
            <Route path='register' element={ <Register/> }  />
          </Route>
          
          <Route  path="/dev" element={<Dashboard />}>
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
