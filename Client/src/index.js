import React from 'react';
import App from './App';
import ReactDOM from 'react-dom/client'
import {Auth} from './components/Auth';
import {Login} from './components/Login';
import { Register } from './components/Register'; 
import {
  BrowserRouter, Route, Routes
} from 'react-router-dom'

const root = ReactDOM.createRoot( document.getElementById("root") );


root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/auth' element={<Auth/>} >
        <Route path='login' element={<Login/>} />
        <Route path='register' element={<Register/>} />
      </Route>
    </Routes>
  </BrowserRouter>
);

