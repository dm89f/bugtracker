import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import {  Form,Col, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap'
import { 
    getTicketPriority, getTicketStatus, 
    getTicketType
      
} from '../utils/ticketUtils'
import { useAddTicket, useUpdateTicket, useUpdateTicketTeam } from '../contexts/TicketsContexts'



function EditTicket({setEditTicket, editTicket, projectTeam}) {

  const [ title, setTitle ] = useState('');
  const [ description, setDescription ] = useState('');
  const [ ticketTeam, setTicketTeam ] = useState({"ticket_team":[]});
  const [ ticketType, setTicketType ] = useState('')
  const [ ticketPriority, setTicketPrioritiy ] = useState('')
  const [ ticketStatus, setTicketStatus ] = useState('')
  const [ timeEst, setTimeEst ] = useState('');
  const [ticketTypes, setTicketTypes] = useState([]);
  const [ticketPriorities, setTicketPriorities] = useState([]);
  const [ticketStatuses, setTicketStatuses] = useState([]);
  const {id} = useParams();
  const updateTicket = useUpdateTicket();
  const updateTicketTeam = useUpdateTicketTeam()
  const [ modal ,setModal ] = useState(false);



  useEffect(()=>{

    initEditTicket();

  },[]);

  useEffect(()=>{

    if( editTicket.id ){
      setDescription(editTicket.id ? editTicket.description : "")
      setTitle(editTicket.id ? editTicket.title : "");
      setTimeEst(editTicket.id  ? editTicket.time_est : "");
      setTicketPrioritiy(editTicket.tpriority.id);
      setTicketStatus(editTicket.tstatus.id);
      setTicketType(editTicket.ttype.id)

      setModal(true);

    }else{

      setModal(false);
    }

  },[editTicket])

  function toggleModal(){
    
    if( editTicket.id ){
      setEditTicket({})
    }

  }


  async function initEditTicket(){

    try{
      
      let data = await getTicketStatus();
      setTicketStatuses(data);
      data = []
      data = await getTicketPriority();
      setTicketPriorities(data)
      data = []
      data = await getTicketType();
      setTicketTypes(data)



    }catch(error){

      console.log(error);

    } 

  }

  async function handleSubmit(e){

    e.preventDefault();
    const ticketInfo = {
      title: title ,
      description: description ,
      time_est: timeEst ,
      tpriorityId: ticketPriority,
      tstatusId: ticketStatus,
      ttypeId: ticketType
    }

    try{

      const ticket = await updateTicket( editTicket.id, ticketInfo );
      const devs = [...ticketTeam.ticket_team]
      await updateTicketTeam(editTicket.id, devs ); 

      setDescription('');
      setTicketTeam([]);
      setTicketType('');
      setTicketPrioritiy('');
      setTicketStatus('');
      setTimeEst('');
      toggleModal();

    }catch(error){

      console.log(error);

    }


  }

  function handleTiketAsgn(e){

    let data = Array.from(e.target.selectedOptions, ((item)=>{
      return item.value;
    }))
    setTicketTeam({ ["ticket_team"]:data });
  }


  return (
    <Modal isOpen={modal}  >
      <ModalHeader toggle={toggleModal} >Edit Ticket</ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit} >
          <FormGroup>
            <Label htmlFor='title' >Title</Label>
            <Input 
              required
              onChange={(e)=>{  setTitle(e.target.value) }} 
              value={title}  
              type='text' name='title' 
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor='description'>Discription</Label>
            <Input 
              required
              onChange={(e)=>{setDescription(e.target.value)}} 
              value={description} 
              type='textarea' 
              name='description'
            />
          </FormGroup>
          <Row>
            <Col sm={8}>
              <FormGroup>
                <Label htmlFor='t_asgn_devs' >Assign Dev</Label>
                <select 
                  required
                  name='t_asgn_devs'
                  className='form-select'
                  onChange={handleTiketAsgn}
                  multiple
                >
                {
                  projectTeam.project_team.map((item)=>{
                    return(
                      <option key={item.id} value={item.id}>
                        { item.firstname + " " + item.lastname + "( " + item.email +" )" }
                      </option>
                    )
                  })
                }
                </select>
              </FormGroup>
            </Col>
            <Col sm={4}>
              <Label htmlFor='time_est'>Time Estimated</Label>
              <Input 
                onChange={(e)=>{ setTimeEst(e.target.value) }}  name='time_est' type='number' step={0.5} 
                value={timeEst}                
              >
              </Input>
            </Col>
          </Row>
          <Row>
            <Col sm={6}>              
              <FormGroup>
                <Label htmlFor='priority'>Priority</Label>
                {
                  <select 
                    required
                    onChange={(e)=>{ setTicketPrioritiy(e.target.value) }} 
                    value={ticketPriority} className='form-select' type={"select"}>
                    {
                      ticketPriorities&&ticketPriorities.map( (item)=>{
                        return(
                          <option key={item.id} value={item.id}>{item.title}</option>
                        )
                      } )
                    }
                  </select>
                }
              </FormGroup>
            </Col>
            <Col sm={6}>
              <FormGroup>
                <Label htmlFor='priority'>Status</Label>
                {
                  <select
                    required
                    onChange={(e)=>{ setTicketStatus(e.target.value) }} 
                    value={ticketStatus} 
                    className='form-select' type={"select"}>
                    {
                      ticketStatuses&&ticketStatuses.map( (item)=>{
                        return(
                          <option key={item.id} value={item.id}>{item.title}</option>
                        )
                      } )
                    }
                  </select>
                }
              </FormGroup>
            </Col>
          </Row>
          <FormGroup>
                <Label htmlFor='priority'>Type </Label>
                {
                  <select 
                    required
                    onChange={(e)=>{ setTicketType(e.target.value) }} 
                    value={ticketType} 
                    className='form-select' type={"select"}
                  >
                    {
                      ticketTypes&&ticketTypes.map( (item)=>{
                        return(
                          <option key={item.id} value={item.id}>{item.title}</option>
                        )
                      } )
                    }
                  </select>
                }
          </FormGroup>

          <ModalFooter>        
            <button type='submit' className='btn btn-success' >Update</button>
            <button onClick={toggleModal} className=' btn ms-auto btn-danger' >Close</button>
          </ModalFooter>
        </Form>

      </ModalBody>

    </Modal>
  );
}

export default EditTicket