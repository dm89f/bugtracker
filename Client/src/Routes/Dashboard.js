import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate,} from 'react-router-dom'
import {AiOutlineMenuUnfold, AiOutlineUser} from 'react-icons/ai';
import Sidebar from '../components/Sidebar'
import { Link } from 'react-router-dom';
import {Button} from 'reactstrap';
import {useGetDevLogout, useGetDev} from '../contexts/UserContext'

import {useTheme, useToggleTheme} from '../contexts/ThemeContext'


const Dashboard = () => {

  const navigate = useNavigate();
  const devInfo = useGetDev();
  const reqDevLogout = useGetDevLogout();
  const darkTheme = useTheme();
  const toggleTheme = useToggleTheme();


  useEffect(()=>{

    if(!devInfo){
      
      navigate('/login');

    }


  }, [devInfo])


  return (
    <div >
      <Sidebar/>
        <section className={`main-contnr ${darkTheme?'d-theme':""}`}>
          <div className={`side-menu ${darkTheme?'d-theme':""}`}><AiOutlineMenuUnfold size={40}/></div>        
          <section className={`brand-nav ${darkTheme?'d-theme':""} `} >
            <div className={`top-nav ${darkTheme?'d-theme':""}`} >
              <h1>BRAND</h1>
              <Button className={`btn ms-auto btn-small ${darkTheme?'d-theme':""}`} onClick={ toggleTheme }>Toggle Theme</Button>
              <div className={`ms-auto dropdown ${darkTheme?'d-theme':""}`}>
                
                <button  className={`btn-sm btn-secondary dropdown-toggle ${darkTheme?'d-theme':""}`} type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                  <AiOutlineUser className={`mb-2 ${darkTheme?'d-theme':""}`} size={30}/>
                  <h5 className={`d-inline px-3 ${darkTheme?'d-theme':""}`} >Dileep B C</h5>
                </button>
                <ul className={`dropdown-menu ${darkTheme?'d-theme':""}`} aria-labelledby="dropdownMenuButton1">
                  <li className={`text-center ${darkTheme?'d-theme':""}`}>
                    <Link to="/dev" className={`dropdown-item ${darkTheme?'d-theme':""}`}>
                      <h5>Profile</h5>
                    </Link>
                  </li>
                  <li className={`text-center ${darkTheme?'d-theme':""}`} >
                    <Link to="#" className={`dropdown-item ${darkTheme?'d-theme':""}`} onClick={reqDevLogout}s>
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