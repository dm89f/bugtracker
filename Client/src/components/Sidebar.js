import React from 'react'

import {   Link, NavLink   } from 'react-router-dom'

import { FaBug,} from 'react-icons/fa';
import { FiMonitor} from 'react-icons/fi';
import {AiTwotoneNotification} from 'react-icons/ai'
import {FaUserShield} from 'react-icons/fa'
import {GrUserAdmin} from 'react-icons/gr';
import {  Button, Nav, NavItem } from 'reactstrap';

const {useGetDevLogout} = require('../contexts/UserContext')
const { useTheme } = require('../contexts/ThemeContext')

function Sidebar() {

  const reqDevLogout = useGetDevLogout();
  const darkTheme = useTheme();

  return (
    <section >
      <Nav className={`side-nav shadow ${darkTheme?"d-theme":""}`} vertical>

        <NavItem>
          <div className={`text-center mt-4 ${darkTheme?"d-theme":""}`}>
            <FaBug size={35}/>
          </div>
          <h3 className={`text-center ${darkTheme?"d-theme":""}`} >Bug Tracker</h3>
        </NavItem>

        <NavLink className={`nav-link ${darkTheme?"d-theme":""}`} to="/dev/dashboard" >
          <FiMonitor /> Dashboard
        </NavLink>

        <NavLink className={`nav-link ${darkTheme?"d-theme":""}`} to="/dev/tickets" >
          <AiTwotoneNotification /> Tickets 
        </NavLink> 
        <NavLink className={`nav-link ${darkTheme?"d-theme":""}`} to="/dev/admin" >
          <FaUserShield /> Admin  
        </NavLink>
          <NavItem >
            <Button onClick={reqDevLogout} color={'danger'} className={`ms-3 mt-3 ${darkTheme?"d-theme":""}`}>Logout</Button>
          </NavItem>
        
      </Nav>
    </section>
  );
}

export default Sidebar