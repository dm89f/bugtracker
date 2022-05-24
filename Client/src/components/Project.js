import React, { useEffect, useState } from 'react'
import {
  Row,  Col,  Button
} from 'reactstrap'
import { useParams } from 'react-router-dom'

import {
  FaEdit
} from 'react-icons/fa'
import {CgRemove} from 'react-icons/cg';
import { getProjectTeam } from '../utils/devTeamUtils'
import {getDevProject} from '../utils/projectUtil'
import {useProjTickets} from '../contexts/TicketsContexts'


const Project = () => {

  const {id} = useParams();
  const [ project, setProject ] = useState({});
  const tickets = useProjTickets();
  const [ projectTeam, setProjectTeam ] = useState({"project_team":[]});

  useEffect(()=>{
    initProject();
  },[]); 

  async function initProject(){
    
    try{
      
      const data = await getProjectTeam(id);
      setProjectTeam({"project_team":data})
      const resp = await getDevProject(id);
      setProject(resp)
      console.log(tickets)
    }catch(error){
      console.log(error);
    }

  }



  return (
   <section className='hero-contnr'>
    <section className='container-fluid mt--5'>
      <div className='row'>
        <div className='col-xl-4 mt-3'>
          <div className='shadow card'>
            <div className='card-header'>
              <div className='row align-items-center mb-2'>
                <div className='col'>
                  <h5 className='mb-0' >Team</h5>
                </div>
                <div className='col'>
                  <Button className=' btn-sm d-block ms-auto'>Add New Member</Button>
                </div>
              </div>
              <div className='table-responsive'>
                <table className='align-items-center table-flush table'>
                  <thead className='thead-light'>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Phone</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                      {
                        projectTeam.project_team.map( (member)=>{
                            return(
                              <tr className='teamRow' key={member.id} >
                                <td>{member.firstname + " " + member.lastname }</td>
                                <td>{ member.email }</td>
                                <td>{member.phone_no}</td>
                                <td><CgRemove color={`red`} /></td>
                              </tr>
                            )                          
                          } 
                       )

                      }

                  </tbody>
                </table>
              </div>
              <div className='card-footer'>Footer</div>
            </div>

          </div>
        </div>
        <div className='col-xl-8 mt-3'>
          <div className='shadow card'>
            <div className='card-header'>
              <div className='row align-items-center mb-2'>
                <div className='col'>
                  <h5 className='mb-0' >Tickets</h5>
                </div>
                <div className='col'>
                  <Button className=' btn-sm d-block ms-auto'>Raise New Ticket</Button>
                </div>
              </div>
              <div className='table-responsive'>
                <table className='align-items-center table-flush table'>
                  <thead className='thead-light'>
                    <tr>
                    <th scope="col">Ticket Title</th>
                    <th scope="col">Description</th>
                    <th scope="col">Author</th>
                    <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    
                    {

                      tickets && tickets.map( (ticket)=>{

                        return(
                          <tr className='teamRow'  key={ticket.id} >
                              <th>{ticket.title}</th>
                              <td>{ticket.description}</td>
                              <td>{ticket&&ticket.developer&&ticket.developer.fullName}</td>
                              <td><FaEdit/></td>
                          </tr>
                        )

                      } )

                    }

                    {/* <tr className='teamRow'>
                      <th>add chat function</th>
                      <td>chat Funcationality</td>
                      <td>Dileep</td>
                      <td>:</td>
                    </tr> */}
                  </tbody>
                </table>
              </div>
              <div className='card-footer'>Footer</div>
            </div>

          </div>
        </div>
      </div>
      <div className='row mt-5'>
        <div className='shadow card'>
          <div className='card-header'>
            <h6>Selected Ticket Info</h6>
          </div>
          <div className='card-body'>
          <div className='row'>
            <div className='col-xl'>
              <div className='row mt-3'>
                <div className='shadow card'>
                  <div className='card-body'>
                    <div className='row'>
                      <div className='col'>
                        <h6>Ticket Title</h6>
                      </div>
                      <div className='col'>
                        <h6>Ticket Author </h6>
                      </div>
                      <div className='col'>
                        <h6>Ticket Discription</h6>
                      </div>
                      <div className='col'>

                      </div>
                    </div>
                    <div className='row'>
                      <div className='col'>
                        <h6>Dileep</h6>
                      </div>
                      <div className='col'>
                        <h6>test </h6>
                      </div>
                      <div className='col'>
                        <h6>Test</h6>
                      </div>
                      <div className='col'>                        
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col'>
                        <h6>Dileep</h6>
                      </div>
                      <div className='col'>
                        <h6>test </h6>
                      </div>
                      <div className='col'>
                        <h6>Test</h6>
                      </div>
                      <div className='col'>                        
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-xl'>
              <div className='shadow card mt-3'>
                <div className='card-body'>
                  <div className='row'>
                    <div className='col'>
                      Messages
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          </div>
        </div>        
      </div>

    </section>
   </section>
  )
}


export default Project;