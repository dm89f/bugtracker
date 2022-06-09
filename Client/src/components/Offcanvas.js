import React from 'react'
import {   Link, NavLink   } from 'react-router-dom'

import { FaBug,} from 'react-icons/fa';
import { FiMonitor} from 'react-icons/fi';
import {AiTwotoneNotification} from 'react-icons/ai'
import {FaUserShield} from 'react-icons/fa'
import {GrUserAdmin} from 'react-icons/gr';
import {BsUiChecks} from  'react-icons/bs';
import {  Button, Nav, NavItem, Offcanvas, OffcanvasHeader, OffcanvasBody } from 'reactstrap';

const {useGetDevLogout} = require('../contexts/UserContext')
const { useTheme } = require('../contexts/ThemeContext')

function OfCanvasSideBar({sideMenu ,toggleSideMenu, authorization }) {

  const reqDevLogout = useGetDevLogout();
  const darkTheme = useTheme();

  return (
    <Offcanvas className={`sidenav-toggle ${darkTheme?"d-theme":""}`} isOpen={sideMenu} toggle={toggleSideMenu}  >
      <OffcanvasHeader toggle={toggleSideMenu}>
        <div>
          <div className={`text-center mt-4 ${darkTheme?"d-theme":""}`}>
            <FaBug size={35}/>
          </div>
          <h3 className={`text-center ${darkTheme?"d-theme":""}`} >Bug Tracker</h3>
        </div>
      </OffcanvasHeader>
      <OffcanvasBody>
        <Nav className={` ${darkTheme?"d-theme":""}`} vertical>
        <NavLink className={`nav-link ${darkTheme?"d-theme":""}`} to="/dev/dashboard" >
          <FiMonitor /> Dashboard
        </NavLink>

        <NavLink className={`nav-link ${darkTheme?"d-theme":""}`} to="/dev/tickets" >
          <AiTwotoneNotification /> Tickets 
        </NavLink> 
        {
          authorization==='admin'
            ?
            <NavLink className={`nav-link ${darkTheme?"d-theme":""}`} to="/dev/admin" >
              <FaUserShield /> Admin  
            </NavLink>
            :
            ""
        }

        <NavLink className={`nav-link ${darkTheme?"d-theme":""}`} to="/dev/todos" >
          <BsUiChecks /> Todos  
        </NavLink>
        <NavItem >
          <Button onClick={reqDevLogout} color={'danger'} className={`ms-3 mt-3 ${darkTheme?"d-theme":""}`}>Logout</Button>
        </NavItem>

        </Nav>
      </OffcanvasBody>
    </Offcanvas>
  );
}


export default OfCanvasSideBar