import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import './App.css'
import {Auth} from './components/Auth';
import {Login} from './components/Login';
import { Register } from './components/Register'; 
import {
  BrowserRouter, Route, Routes
} from 'react-router-dom'
import { IndexPage } from './components/IndexPage'



const root = ReactDOM.createRoot( document.getElementById("root") );

root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/auth' element={<Auth/>} >
        <Route path='login' element={<Login/>} />
        <Route path='register' element={<Register/>} />
      </Route>
        <Route path='/index' element={<IndexPage/>} >
        </Route>
    </Routes>
  </BrowserRouter>
);

