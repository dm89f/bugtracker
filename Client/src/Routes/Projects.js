import React from 'react'

import { Button, Row, Col } from 'reactstrap';

import {useTheme} from '../contexts/ThemeContext'

const Projects = () => {

  const darkTheme = useTheme();


  return (
    <div>
      <section className={`hero-contnr ${darkTheme?"d-theme":""}`} >
        <section className={`shadow card ${darkTheme?"d-theme":""}`}>
          <div className={`card-header ${darkTheme?"d-theme":""}`}>
            <div className={`row ${darkTheme?"d-theme":""}`}>
              <div className={`col ${darkTheme?"d-theme":""}`}>            
                <h5>Projects</h5>
              </div>
              <div className={`col ${darkTheme?"d-theme":""}`}>
                <Button color={'primary'} className={`d-block ms-auto btn btn-sm  ${darkTheme?"d-theme":""}`}>Add New Project</Button>
              </div>   
            </div>           
          </div>
          <div className={`card-body ${darkTheme?"d-theme":""}`}>
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