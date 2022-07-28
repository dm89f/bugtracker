import React, { useEffect, useState } from 'react';
import { Button } from 'reactstrap' ;
import {FaRegEdit} from 'react-icons/fa';
import {useTheme} from '../contexts/ThemeContext';
import {useGetAllDevProjects, useRefDevProjects, useDeleteDevProject} from '../contexts/ProjectsContext';
import AddProject from '../components/AddProject';
import EditProject from '../components/EditProject'
import {isArray} from '../utils/utils'
import { Link } from 'react-router-dom';
import {useGetDev} from '../contexts/UserContext';
import TicketGraph from '../components/TicketGraph'
import {useSetTabTitle} from "../contexts/RouteTitleContext"

const Projects = () => {
  
  const darkTheme = useTheme();
  const projects = useGetAllDevProjects();
  const refreshProjects = useRefDevProjects();
  const [showProjects, setShowProjects] = useState([]) ;
  const [addProj, toggleAddProj ] = useState(false);
  const [projectInfo, setProjectInfo] = useState({})
  const deleteDevProject = useDeleteDevProject();
  const setTabTitle = useSetTabTitle();
  
  useEffect(()=>{
    setTabTitle("Projects")
  },[])

  useEffect(()=>{
    if(isArray(projects)){
      setShowProjects(projects);
    }
  },[projects])

  useEffect(()=>{

    if(!addProj ){
      refreshProjects();
    }

  },[addProj])

  return (
    <div>
      <AddProject addProj={addProj} toggleAddProj={toggleAddProj} />
      <EditProject projectInfo={projectInfo} setProjectInfo={setProjectInfo} />
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
            <div className={`card-body ${darkTheme?"d-theme":""} project-list-body `}>
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
                                    <li 
                                      onClick={()=>{ 
                                        setProjectInfo( { 
                                          id:project.projectId, 
                                          title:project.title,
                                          description:project.description,
                                          contributed_by:project.contributed_by
                                        } )
                                      }} 
                                    className ={`dropdown-item`}>Edit</li>
                                    <li 
                                      className  ={`dropdown-item`}
                                      onClick = {()=> { deleteDevProject(project.projectId) }}
                                    >Delete</li>
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
            {/* <div className={`card-footer`}>
            </div> */}
          </section>
          
          <TicketGraph />

        </section>
    </div>
  )
}

export default Projects;