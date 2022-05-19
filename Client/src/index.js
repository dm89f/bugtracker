import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import './App.css'
import App from './App';

import { UserContextProvider } from './contexts/UserContext'


const root = ReactDOM.createRoot( document.getElementById("root") );

root.render(
  <UserContextProvider>
    <App/>
  </UserContextProvider>
);

