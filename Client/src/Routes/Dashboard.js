import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate,} from 'react-router-dom'
import {AiOutlineMenuUnfold, AiOutlineUser} from 'react-icons/ai';
import {HiOutlineLightBulb} from 'react-icons/hi'
import Sidebar from '../components/Sidebar';
import OfCanvasSideBar from '../components/Offcanvas';
import { Link, useLocation } from 'react-router-dom';
import {Button} from 'reactstrap';
import {useGetDevLogout, useGetDev} from '../contexts/UserContext'

import {useTheme, useToggleTheme} from '../contexts/ThemeContext'
import {ProjectsContextProvider} from '../contexts/ProjectsContext'
import {DevTeamContextProvider} from '../contexts/DevTeamCtx'

const Dashboard = () => {

  const navigate = useNavigate();
  const devInfo = useGetDev();
  const reqDevLogout = useGetDevLogout();
  const darkTheme = useTheme();
  const toggleTheme = useToggleTheme();
  const location = useLocation();
  const dev = useGetDev();
  const [ sideMenu, setSideMenu] = useState(false);
  const [ pageHeading, setPageHeading ] = useState('');
  

  const toggleSideMenu = ()=>{
    setSideMenu((prev)=>(!prev));
  }

  useEffect(()=>{
    let curPath = '';
    curPath = location.pathname.split('/');
    setPageHeading(curPath[curPath.length-1].toUpperCase());
    
  },[location])

  useEffect(()=>{

    if(!devInfo){
      
      navigate('/login');

    }


  }, [devInfo])


  return (
    <section>
      <Sidebar/>
      <OfCanvasSideBar sideMenu={sideMenu}  toggleSideMenu={toggleSideMenu}/>
      <section className={`main-contnr ${darkTheme?'d-theme':""}`}>
        <div className={`side-menu ${darkTheme?'d-theme':""}`}>
          <AiOutlineMenuUnfold 
            color={`${darkTheme?"":"darkblue"}`}
            onClick={toggleSideMenu}
            size={40}
          />
        </div>        
        <section className={`brand-nav ${darkTheme?'d-theme':""} `} >
          <div className={` d-flex flex-row-reverse  top-nav ${darkTheme?'d-theme':""}`} >
            
            <div className={`dropdown ${darkTheme?'d-theme':""}`}>
              
              <button  className={`btn-sm btn-secondary dropdown-toggle ${darkTheme?'d-theme':""}`} type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                <AiOutlineUser className={`mb-2 ${darkTheme?'d-theme':""}`} size={30}/>
                <span className={`d-inline fs-5 px-3 ${darkTheme?'d-theme':""}`} >{ dev.firstname }</span>
              </button>
              
              <ul className={`dropdown-menu ${darkTheme?'d-theme':""}`} aria-labelledby="dropdownMenuButton1">
                <li className={`px-1   text-center ${darkTheme?'d-theme':""}`}>
                  <Link to="/dev" className={`dropdown-item ${darkTheme?'d-theme':""}`}>
                    <span className='fs-7'>Profile</span>
                  </Link>
                </li>
                <li className={`px-1   text-center ${darkTheme?'d-theme':""}`} >
                  <Link to="#" className={`dropdown-item ${darkTheme?'d-theme':""}`} onClick={reqDevLogout}s>
                    <span className='fs-7'>Logout</span>
                  </Link>
                </li>                
              </ul>
            </div>

            <div className='me-3 mt-1'>
              <label htmlFor='theme-switch'><HiOutlineLightBulb size={30} color={`${darkTheme?'yellow':"darkblue"}`} />
              </label>    
              <input onChange={ toggleTheme } className='d-none' id='theme-switch' type='checkbox'></input>
            </div>

            <p className='fs-1 me-auto '>{pageHeading}</p>

          <div>
          </div>
          </div>
        </section>

        <ProjectsContextProvider>
          <DevTeamContextProvider>
            <Outlet/>
          </DevTeamContextProvider>
        </ProjectsContextProvider>

      </section>
    </section>
  )
}


export default Dashboard;