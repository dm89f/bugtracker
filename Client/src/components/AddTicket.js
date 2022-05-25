import React, { useEffect, useState } from 'react'
import {  Form,Col, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap'
import { getTicketPriority, getTicketStatus, getTicketType } from '../utils/ticketUtils'


function AddTicket({addTicket, toggleAddTicket, projectTeam}) {

  const [ title, setTitle ] = useState('');
  const [ description, setDescription ] = useState('');
  const [ ticketTeam, setTicketTeam ] = useState({"ticket_team":[]});
  const [ ticketType, setTicketType ] = useState('')
  const [ ticketPriority, setTicketPrioritiy ] = useState('')
  const [ ticketStatus, setTicketStatus ] = useState('')

  const [ticketTypes, setTicketTypes] = useState([]);
  const [ticketPriorities, setTicketPriorities] = useState([]);
  const [ticketStatuses, setTicketStatuses] = useState([]);

  useEffect(()=>{

    initAddTicket();

  },[]);

  async function initAddTicket(){

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
    console.log(title)
    console.log(description)
    console.log(ticketTeam)
    console.log(ticketType)
    console.log(ticketPriority)
    console.log(ticketStatus)

  }

  function handleTiketAsgn(e){

    let data = Array.from(e.target.selectedOptions, ((item)=>{
      return item.value;
    }))
    setTicketTeam({ ["ticket_team"]:data });
  }



  return (
    <Modal isOpen={addTicket}  >
      <ModalHeader toggle={toggleAddTicket} >Add New Ticket</ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit} >
          <FormGroup>
            <Label htmlFor='title' >Title</Label>
            <Input 
              required
              onChange={(e)=>{  setTitle(e.target.value) }} value={title}  
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
                    onChange={(e)=>{ setTicketStatus(e.target.value) }} value={ticketStatus} 
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
                    onChange={(e)=>{ setTicketType(e.target.value) }} value={ticketType} 
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
            <button type='submit' className='btn btn-success' >Submit</button>
            <button onClick={toggleAddTicket} className=' btn ms-auto btn-danger' >Close</button>
          </ModalFooter>
        </Form>

      </ModalBody>

    </Modal>
  );
}

export default AddTicket