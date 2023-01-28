import axios from "axios";
import React, { useEffect, useState } from "react";
import{
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import AddressNotFound from './Routes/AddressNotFound'
import Login from './Routes/Login'
import Dashboard from './Routes/Dashboard'
import Projects from './Routes/Projects';
import Register from "./Routes/Register";
import Tickets from "./Routes/Tickets";
import AdminDashboard from "./components/AdminDashboard";
import Todos from "./Routes/Todos";
import ProjectRoute from "./Routes/ProjectRoute";
import TodoContextProvider from "./contexts/TodoContext";
import Profile from "./components/Profile";
import AdminRoute from "./Routes/AdminRoute";
import {ToastContainer} from 'react-toastify'
import {RouteTitleContextProvider} from './contexts/RouteTitleContext'
import Home from "./components/Home";

function App() {


  return (
      <BrowserRouter>
        <ToastContainer/>
        <Routes>
          <Route path="/" element={<Home/>}>

          </Route>
          <Route path='/login' 
            element={ <Login /> }
          />
          <Route path='/register' element={ <Register/> }  />
          
          <Route  path="/dev" element={
            <RouteTitleContextProvider>
              <Dashboard />
            </RouteTitleContextProvider>
          }>
            <Route index element={<Profile/>} />
            <Route path="dashboard" element={<Projects/>} />
            <Route path='tickets' element={<Tickets/>} />
            <Route path="project/:id" element={ <ProjectRoute/> } />
            <Route path="todos" element={ 
              <TodoContextProvider>
                <Todos/>
              </TodoContextProvider> }/>
            <Route path="admin" element={<AdminRoute/>} >
              <Route index element={<AdminDashboard/>} />  
            </Route>

          </Route>
          <Route path="*" element={<AddressNotFound/>} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
