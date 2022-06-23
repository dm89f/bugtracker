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
import AddTicket from './AddTicket';
import { useDeleteTicket } from '../contexts/TicketsContexts'
import EditTicket from './EditTicket';
import UpdateDevTeam from './UpdateDevTeam';
import TicketMessage from './TicketMessage'

import io from 'socket.io-client';
import { toast } from 'react-toastify';
import {useGetDev}from '../contexts/UserContext'
import { useTheme } from '../contexts/ThemeContext';
const socket = io("http://localhost:3001");

const Project = () => {

  const {id} = useParams();
  const [ project, setProject ] = useState({});
  const tickets = useProjTickets();
  const [ticket, setTicket] = useState({});
  const [ projectTeam, setProjectTeam ] = useState({"project_team":[]});
  const [addTicket, setAddTicket] = useState(false);
  const deleteTicket = useDeleteTicket();
  const [ editTicket, setEditTicket  ] = useState({});
  const [ devTeamModal, setDevTeamModal ] = useState(false);
  const dev = useGetDev();
  const [ histMsg, setHistMsg ] = useState([])
  const darkTheme = useTheme();
  //connect to room when selected ticked changes
  useEffect( ()=>{

    if(ticket.id){
      socket.emit(
        "join_room",
        {"room":{
            user:dev,
            id:ticket.id, 
            name:ticket.title
        }},
        (resp)=>{
        setHistMsg(resp.msgHistory)
       } 
      );
    }
    
    setHistMsg([]);

  },[ticket] )


  useEffect(()=>{

    initProject();

  },[devTeamModal]); 

  useEffect(()=>{
    setTicket([])
  },[tickets])



  const toggleAddTicket = ()=>{
    setAddTicket((prev)=>(!prev))
  }

  async function initProject(){
    
    try{
      
      const data = await getProjectTeam(id);
      setProjectTeam({"project_team":data})
      const resp = await getDevProject(id);
      setProject(resp)
    }catch(error){
      console.log(error);
    }

  }



  return (

   <section className='hero-contnr'>
     <UpdateDevTeam projectId={id} devTeamModal={devTeamModal} setDevTeamModal={setDevTeamModal} />
     <AddTicket toggleAddTicket={toggleAddTicket} addTicket={addTicket} projectTeam={projectTeam} />
     <EditTicket  setEditTicket={setEditTicket} editTicket={editTicket} projectTeam={projectTeam} />
    <section className='container-fluid mt--5'>
      <div className='row'>
        <div className='col-xl-4 mt-3'>
          <div className='shadow card border-0 '>
            <div className={`card-header ${darkTheme?"dark-card-header":""}`}>
              <div className='row align-items-center mb-2'>
                <div className='col'>
                  <h5 className='mb-0' >Team</h5>
                </div>
                <div className='col'>
                  <Button 
                    onClick={()=>setDevTeamModal(true)}
                    className={`btn-sm btn-primary  d-block ms-auto ${darkTheme?"d-theme":""}`}
                  >Update Team</Button>
                </div>
              </div>

            </div>
            <div className={`card-body ${darkTheme?"dark-card-body":""}`}>
              <div className='table-responsive'>
                <table className={`align-items-center table-flush table ${darkTheme?"d-theme":""}`} >
                  <thead className='thead-light'>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Phone</th>
                      {/* <th scope="col"></th> */}
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
                              </tr>
                            )                          
                          } 
                      )

                      }

                  </tbody>
                </table>
              </div>
            </div>

            <div className={`card-footer ${darkTheme?"dark-card-footer":""}`}>
              
            </div>

          </div>
        </div>
        <div className='col-xl-8 mt-3'>
          <div className='shadow card border-0'>

            <div className={`card-header ${darkTheme?"dark-card-header":""}`}>
              <div className='row align-items-center mb-2'>
                <div className='col'>
                  <h5 className='mb-0' >Tickets</h5>
                </div>
                <div className='col'>
                  <Button 
                    className={`btn-sm btn-primary  d-block ms-auto ${darkTheme?"d-theme":""}`}
                    onClick={toggleAddTicket}
                  >Raise New Ticket</Button>
                </div>
              </div>

            </div>
            <div className={`card-body ${darkTheme?"dark-card-body":""}`}>
              <div className='table-responsive'>
                <table className={`align-items-center table-flush table ${darkTheme?"d-theme":""}`}>
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
                          <tr onClick={()=>setTicket(ticket)}  className='teamRow'  key={ticket.id} >
                              <th>{ticket.title}</th>
                              <td>{ticket.description}</td>
                              <td>{ticket&&ticket.developer&&ticket.developer.fullName}</td>
                              <td>
                                <div className={`btn-group dropend`} >
                                  <button type="button" className={`btn btn-sm dropdown-toggle`}   
                                    data-bs-toggle="dropdown" aria-expanded="false">
                                    <FaEdit/>
                                  </button>
                                  <ul className={`dropdown-menu proj-opt`}>
                                    <li 
                                    onClick={()=>{ setEditTicket(ticket) }}   
                                    className ={`dropdown-item`}>Edit</li>
                                    <li 
                                      className  ={`dropdown-item`}
                                      onClick = { ()=>{ deleteTicket(ticket.id) } }
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
            <div className={`card-footer ${darkTheme?"dark-card-footer":""}`}>
                
            </div>
          </div>
        </div>
      </div>
      <div className=' mt-3 mx-1'>
        <div className='shadow card border-0 '>
          <div className={`card-header ${darkTheme?"dark-card-header":""}`}>
            <h6>Selected Ticket Info</h6>
          </div>
          <div className={`card-body ${darkTheme?"dark-card-body":""}`}>
            <div className='row'>
            <div className='col-xl'>
              <TicketMessage 
                socket={socket} 
                ticket={ticket}
                histMsg={histMsg}
                setHistMsg={setHistMsg}
              />
          </div>
          <div className='col-xl'>
            <div className='mt-3'>
              <div className='shadow card border-0'>
                <div className={`card-header ${darkTheme?"dark-card-header":""}`}>
                  <h6>Selected Ticket Info</h6>
                </div>
                <div className={`card-body ${darkTheme?"dark-card-body":""}`}>
                  <div className='row'>
                    <div className='table-responsive'>
                      <table className={`table ${darkTheme?"d-theme":""}`} >
                        <thead>
                          <tr>
                            <th>Ticket Title</th>
                            <th>Ticket Author</th>
                            <th>Ticket Discription</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th>{ticket.id&&ticket.title}</th>
                            <td>{ticket.id&&ticket.developer.fullName}</td>
                            <td>{ticket.id&&ticket.description}</td>
                            <td>{ticket.id&&
                              <div className={`btn-group dropend`} >
                                <button type="button" className={`btn btn-sm dropdown-toggle`}   
                                  data-bs-toggle="dropdown" aria-expanded="false">
                                  <FaEdit/>
                                </button>
                                <ul className={`dropdown-menu proj-opt`}>
                                  <li 
                                    onClick={()=>{ setEditTicket(ticket) }} 
                                  className ={`dropdown-item`}>Edit</li>
                                  <li 
                                    onClick = { ()=>{ deleteTicket(ticket.id) } }
                                    className  ={`dropdown-item`}
                                  >Delete</li>
                                </ul>
                              </div>}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className='row mt-3'>
                    <div className='table-responsive' >
                      <table className={`table ${darkTheme?"d-theme":""}`}>
                        <thead>
                          <tr>
                            <th>Ticket Priority</th>
                            <th>Ticket Status</th>
                            <th>Ticket Type</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>{ ticket.id && ticket.tpriority.title }</td>
                            <td>{  ticket.id && ticket.tstatus.title }</td>
                            <td>{ ticket.id && ticket.ttype.title }</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className={`card-footer ${darkTheme?"dark-card-footer":""}`}>
                  
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