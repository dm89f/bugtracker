import React from 'react'

import { Button, Row, Col } from 'reactstrap';



export const Projects = () => {
  return (
    <div>
      <section className='hero-contnr' >
        <section className='shadow card'>
          <div className='card-header'>
            <div className='row'>
              <div className='col'>            
                <h5>Projects</h5>
              </div>
              <div className='col'>
                <Button className=' d-block ms-auto btn btn-sm btn-primary'>Add New Project</Button>
              </div>   
            </div>           
          </div>
          <div className='card-body'>
          </div>
        </section>
        <section className='tickets-graph-container'>
          <div className='mt-3 ticket-graph card shadow' >
            <h5 className='card-header' >Tickets by</h5>
          </div>
          <div className='mt-3 ticket-graph card shadow' >
            <h5 className='card-header' >Tickets by</h5>
          </div>
          <div className='mt-3 ticket-graph card shadow' >
            <h5 className='card-header' >Tickets by</h5>
          </div>
        </section>
      </section>
    </div>
  )
}
