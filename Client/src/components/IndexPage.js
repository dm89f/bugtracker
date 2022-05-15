import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {
  Outlet,
  useNavigate
} from 'react-router-dom'

import { FaBug,} from 'react-icons/fa';
import { FiMonitor} from 'react-icons/fi';
import {RiAlarmWarningFill} from 'react-icons/ri'
import {AiOutlineMenuUnfold} from 'react-icons/ai';
import { Projects } from './Projects'
import {
  Button
} from 'reactstrap';


export const IndexPage = ({isLoggedIn, reqLogout}) => {

  // const navigate = useNavigate();
  const [ projects, setProjects ] = useState([]);

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
  },[])
  
  

  return (
    <div >
      <section className='side-nav'>
        <h3 className='text-center mt-4'>
          <FaBug size={35}/>
        </h3>
        <h3 className='text-center' >Bug Tracker</h3>
        <h5 className='mx-4 mt-3' ><FiMonitor className='mx-2'/> Dashboard</h5>
        <h5 className='mx-4 mt-3' ><RiAlarmWarningFill className='mx-2'/> Tickets </h5>
        <h5 className='text-center mt-5'><Button className='btn-sm btn-danger'>Logout</Button></h5>
      </section>
      <section className='main-contnr'>
        <div class="side-menu"><AiOutlineMenuUnfold size={40}/></div>        
        <section className='brand-nav' >
          <h2 className='mx-5 mt-5'>Brand</h2>
        </section>
        <Outlet/>
      </section>
    </div>
  )
}
