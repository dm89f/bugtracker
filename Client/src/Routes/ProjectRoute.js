import React from 'react'
import { Outlet, useParams } from 'react-router-dom'
import {TicketsCtxProvider} from '../contexts/TicketsContexts'
import Project from '../components/Project'

function ProjectRoute() {
  
  const {id} = useParams();
  
  return (
    <section>
      <TicketsCtxProvider projectId={id} >
        <Project/>
      </TicketsCtxProvider>
    </section>
  )
}

export default ProjectRoute