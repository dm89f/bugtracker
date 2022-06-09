import React, { useEffect, useState } from 'react'
import { Table, Card, CardBody, CardHeader, CardFooter } from 'reactstrap';
import { getDevTickets } from '../utils/utils'
import {Link} from 'react-router-dom'

function Tickets() {

  const [ devTickets, setDevTickets ] = useState([]);
  useEffect(()=>{

    refTickets();

  },[])
  
  async function refTickets(){
    const tickets = await getDevTickets();
    setDevTickets(tickets);
    console.log(tickets);
  }


  return (
    <section className='dev-tickets'  >
      <Card>
        <CardBody className='dev-tickets-body'>
          <div className='table-responsive'>
            <Table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Created at</th>
                  <th>Type</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Time allocated</th>
                  <th>Open in Project</th>

                </tr>        
              </thead>
              <tbody>
                {
                  devTickets.map( (ticket)=>{
                    return( 
                      <tr key={ticket.id} >
                        <td>{ticket.title}</td>
                        <td>{ticket.description}</td>
                        <td>{ticket.createdAt}</td>
                        <td>{ticket.ttype.title}</td>
                        <td>{ ticket.tpriority.title }</td>
                        <td>{ ticket.tstatus.title }</td>
                        <td>{ticket.time_est} Hours</td>
                        <td> <Link to={`../project/${ticket.project.id}`} >{ticket.project.title}</Link> </td>
                      </tr> 
                    )
                  } )
                }
              </tbody>
            </Table>
          </div>
        </CardBody>
        <CardFooter></CardFooter>

      </Card>
    </section>
  )
}

export default Tickets