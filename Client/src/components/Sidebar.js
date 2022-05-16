import React from 'react'

import {   Link, NavLink   } from 'react-router-dom'

import { FaBug,} from 'react-icons/fa';
import { FiMonitor} from 'react-icons/fi';
import {AiTwotoneNotification} from 'react-icons/ai'
import {FaUserShield} from 'react-icons/fa'
import {GrUserAdmin} from 'react-icons/gr';
import {  Button, Nav, NavItem } from 'reactstrap';




function Sidebar({reqLogout}) {
  return (
    <section >
      <Nav className='side-nav shadow' vertical>

        <NavItem>
          <div className='text-center mt-4'>
            <FaBug size={35}/>
          </div>
          <h3 className='text-center' >Bug Tracker</h3>
        </NavItem>

        <NavLink className={"nav-link"} to="/dev/dashboard" >
          <FiMonitor /> Dashboard
        </NavLink>

        <NavLink className={"nav-link"} to="/dev/tickets" >
          <AiTwotoneNotification /> Tickets 
        </NavLink> 
        <NavLink className={"nav-link"} to="/dev/admin" >
          <FaUserShield /> Admin  
        </NavLink>
          <NavItem >
            <Button onClick={()=>{ reqLogout(); }}  className='ms-3 mt-3 btn-lg  btn-danger'>Logout</Button>
          </NavItem>
        
      </Nav>
    </section>
  );
}

export default Sidebar