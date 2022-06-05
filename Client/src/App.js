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
import AdminDashboard from "./Routes/AdminDashboard";
import Todos from "./Routes/Todos";
import ProjectRoute from "./Routes/ProjectRoute";
import TodoContextProvider from "./contexts/TodoContext";


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
            <Route path="project/:id" element={ <ProjectRoute/> } />
            <Route path="todos" element={ 
              <TodoContextProvider>
                <Todos/>
              </TodoContextProvider> }/>
            <Route path="admin" element={<AdminDashboard/>} / >

          </Route>
          <Route path="*" element={<AddressNotFound/>} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
