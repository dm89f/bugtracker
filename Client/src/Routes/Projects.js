import React, { useEffect, useState } from 'react'
import { Button } from 'reactstrap' 
import {useTheme} from '../contexts/ThemeContext'
import {useGetAllDevProjects} from '../contexts/ProjectsContext'
import AddProject from '../components/AddProject';
import {isArray} from '../utils/utils'

const Projects = () => {
  
  const darkTheme = useTheme();
  const projects = useGetAllDevProjects();
  const [showProjects, setShowProjects] = useState([]) ;
  const [addProj, toggleAddProj ] = useState(false);

  console.log(projects);  

  useEffect(()=>{
    if(isArray(projects)){
      setShowProjects(projects);
    }
  },[projects])

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
                            <th>{project.title}</th>
                            <td>{project.description}</td>
                            <td>{project.contributed_by}</td>
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