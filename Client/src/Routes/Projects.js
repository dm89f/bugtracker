import React, { useEffect, useState } from 'react'
import { Button } from 'reactstrap' 
import {FaRegEdit} from 'react-icons/fa'

import {useTheme} from '../contexts/ThemeContext'
import {useGetAllDevProjects, useRefDevProjects} from '../contexts/ProjectsContext'
import AddProject from '../components/AddProject';
import {isArray} from '../utils/utils'
import { Link } from 'react-router-dom';
import {useGetDev} from '../contexts/UserContext'

const Projects = () => {
  
  const darkTheme = useTheme();
  const projects = useGetAllDevProjects();
  const refreshProjects = useRefDevProjects();
  const [showProjects, setShowProjects] = useState([]) ;
  const [addProj, toggleAddProj ] = useState(false);
  const dev = useGetDev();

  useEffect(()=>{
    if(isArray(projects)){
      setShowProjects(projects);
    }
  },[projects])

  useEffect(()=>{

    if(!addProj){
      refreshProjects();
    }

  },[addProj])

  return (
    <div>
      <AddProject addProj={addProj} toggleAddProj={toggleAddProj} />
      <section className={`hero-contnr ${darkTheme?"d-theme":""}`} >
        <section className={`shadow card ${darkTheme?"d-theme":""}`}>
          <div className={`card-header ${darkTheme?"d-theme":""}`}>
            <div className={`row ${darkTheme?"d-theme":""}`}>
              <div className={`col ${darkTheme?"d-theme":""}`}>            
                <h5>Projects</h5>
              </div>
              <div className={`col ${darkTheme?"d-theme":""}`}>
                <Button 
                  color={'primary'} className={`d-block ms-auto btn btn-sm  ${darkTheme?"d-theme":""}`}
                  onClick={()=>{ toggleAddProj((prev)=>(!prev)) }}
                >
                  Add New Project
                </Button>
              </div>   
            </div>           
          </div>
          <div className={`card-body ${darkTheme?"d-theme":""}`}>
            <div className={`table-responsive ${darkTheme?"d-theme":""}`}>
              <table className={`table ${darkTheme?"d-theme":""}`}>
                <thead>
                 <tr>
                   <th scope='col'>Project Title</th>
                   <th scope='col'>Description</th>
                   <th scope='col'>Contributed by</th>
                   <th scope='col'></th>
                 </tr>
                </thead>
                <tbody>
                    {
                      showProjects.map( (project, idx)=>{
                        return(
                          <tr key={project.projectId}>
                            <th>
                              <Link className='link' to={`../project/${project.projectId}`} >   {project.title}
                              </Link>
                            </th>
                            <td>{project.description}</td>
                            <td>{project.contributed_by}</td>
                            <td>
                              <div className={`btn-group dropend`}>
                                <button type="button" className={`btn btn-sm dropdown-toggle`} data-bs-toggle="dropdown" aria-expanded="false">
                                  <FaRegEdit/>
                                </button>
                                <ul className={`dropdown-menu proj-opt`}>
                                  <li className ={`dropdown-item`}>Edit</li>
                                  <li className  ={`dropdown-item`}>Delete</li>
                                </ul>
                              </div>
                            </td>
                          </tr>
                        )
                      } )
                    }
                </tbody>
              </table>
            </div>
          </div>
          <div className={`card-footer`}>
          </div>
        </section>
        <section className={`tickets-graph-container ${darkTheme?"d-theme":""}`}>
          <div className={`mt-3 ticket-graph card shadow ${darkTheme?"d-theme":""}`} >
            <h5 className={`card-header ${darkTheme?"d-theme":""}`} >Tickets by</h5>
          </div>
          <div className={`mt-3 ticket-graph card shadow ${darkTheme?"d-theme":""}`} >
            <h5 className={`card-header ${darkTheme?"d-theme":""}`} >Tickets by</h5>
          </div>
          <div className={`mt-3 ticket-graph card shadow ${darkTheme?"d-theme":""}`} >
            <h5 className={`card-header ${darkTheme?"d-theme":""}`} >Tickets by</h5>
          </div>
        </section>
      </section>
    </div>
  )
}

export default Projects;