import React, { useEffect, useState } from 'react'
import {  Outlet, useNavigate,} from 'react-router-dom'
import {AiOutlineMenuUnfold, AiOutlineUser} from 'react-icons/ai';
import Sidebar from '../components/Sidebar'
import { Link } from 'react-router-dom';
import {Button} from 'reactstrap';
import {useGetDevLogout, useGetDev} from '../contexts/UserContext'

const Dashboard = () => {

  const navigate = useNavigate();
 
  const devInfo = useGetDev();
  const reqDevLogout = useGetDevLogout();
  
  useEffect(()=>{

    if(!devInfo){
      
      navigate('/login');

    }


  }, [devInfo])


  return (
    <div >
      <Sidebar/>
      <section className='main-contnr'>
        <div className="side-menu"><AiOutlineMenuUnfold size={40}/></div>        
        <section className='brand-nav' >
          <div className='top-nav' >
            <h1>BRAND</h1>
            {/* <span className='btn btn-light ms-auto'>logout</span> */}
            <div className=" ms-auto dropdown">
              
              <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
              <AiOutlineUser className='mb-2' size={30}/>
                <h5 className='d-inline px-3' >Dileep B C</h5>
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li className='text-center'>
                  <Link to="/dev" className="dropdown-item">
                    <h5>Profile</h5>
                  </Link>
                </li>
                <li className='text-center' >
                  <Link to="#" className="dropdown-item" onClick={reqDevLogout}s>
                    <h5>Logout</h5>
                  </Link>
                </li>                
              </ul>
            </div>
            
          <div>

          </div>
          </div>
        </section>
        <Outlet/>
      </section>
    </div>
  )
}


export default Dashboard;