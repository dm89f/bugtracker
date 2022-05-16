import React, { useEffect, useState } from 'react'
import {
  Outlet,
  useNavigate,
  Link,
  NavLink
} from 'react-router-dom'

import { FaBug,} from 'react-icons/fa';
import { FiMonitor} from 'react-icons/fi';
import {RiAlarmWarningFill} from 'react-icons/ri'
import {AiOutlineMenuUnfold} from 'react-icons/ai';
import {GrUserAdmin} from 'react-icons/gr';
import {
  Button
} from 'reactstrap';


const Dashboard = ({isLoggedIn, reqLogout}) => {

  const [ projects, setProjects ] = useState([]);

  const navigate = useNavigate();
  useEffect(()=>{

    if(!isLoggedIn){
      navigate( '/login' )
    }

  },[isLoggedIn])

  useEffect(()=>{

    fetch('/api_v1/projects')
      .then(res=>{
        return res.json();
      })
      .then((data)=>{
        setProjects(JSON.parse(data));
        console.log(projects);
      })
      .catch(err =>{
        console.log(err);
      })
  },[]); 
  

  return (
    <div >
      <section className='side-nav'>
        <h3 className='text-center mt-4'>
          <FaBug size={35}/>
        </h3>
        <h3 className='text-center' >Bug Tracker</h3>
        <h5 className='mx-4 mt-3' > 
          <NavLink className={"nav-link"} to="/dev/dashboard" >
            <FiMonitor className='mx-2'/> Dashboard
          </NavLink> 
        </h5>
        <h5 className='mx-4 mt-3' > 
          <NavLink className={"nav-link"} to="/dev/tickets" >
            <RiAlarmWarningFill className='mx-2'/> Tickets 
          </NavLink> 
        </h5>
        <h5 className='mx-4 mt-3' > 
          <NavLink className={"nav-link"} to="/dev/admin" >
            <GrUserAdmin className='mx-2'/> Admin  
          </NavLink> 
        </h5>
        <h5 className='text-center mt-5'> 
          <Button onClick={()=>{ reqLogout(); }}  className='btn-sm btn-danger'>Logout</Button>
        </h5>
      </section>
      <section className='main-contnr'>
        <div className="side-menu"><AiOutlineMenuUnfold size={40}/></div>        
        <section className='brand-nav' >
          <h2 className='mx-5 mt-5'>Brand</h2>
        </section>
        <Outlet/>
      </section>
    </div>
  )
}


export default Dashboard;