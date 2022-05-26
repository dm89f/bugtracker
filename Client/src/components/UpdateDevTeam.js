import React, { useEffect, useState } from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader, Form, FormGroup, Input, Label, Button,  } from 'reactstrap'
import {getOpenDevs, } from '../utils/utils'
import { updateProjectTeam } from '../utils/devTeamUtils'
import { useParams } from 'react-router-dom';


function UpdateDevTeam({devTeamModal, setDevTeamModal, projectId}) {

  const [openDevs, setOpenDevs] = useState([]);
  const [ devTeam, setDevTeam ] = useState([]);

  useEffect(()=>{
    init()
  },[]);

  async function handleSubmit(e){

    try{
          
      e.preventDefault();
      e.stopPropagation();
      await updateProjectTeam( projectId, devTeam );
      setDevTeamModal(false);
    
    }catch(error){

      console.log(error);

    }

  }

  async function init(){
    const data = await getOpenDevs();
    setOpenDevs(data);
  }

  function handleChange(e){

    let devs = Array.from( e.target.selectedOptions, (item)=>{
      return item.value;
    } )
    setDevTeam(devs);
  }

  return (
    <Modal isOpen={devTeamModal} >
      <ModalHeader toggle={()=>setDevTeamModal(false)} > Update Project Team </ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit} >
          <FormGroup>
            <Label htmlFor='dev_s'>Select Team Members</Label>
            <select 
              required
              onChange={handleChange}
              className='form-select'
              multiple
            >
              {
                openDevs.map( (item)=>{
                  return(
                    <option key={item.devId} value={item.devId}>
                      {
                        `${item.fullname}`
                      }
                    </option>
                  )
                } )
              }
            </select>
          </FormGroup>
            
          <ModalFooter>
            <Button 
              color='secondary'
              className='me-auto'
              type='submit'>Update</Button>
            <Button 
              color='danger' type='close'
              onClick={ ()=>setDevTeamModal(false) }
            >Close</Button>
          </ModalFooter>

        </Form> 
      </ModalBody>
    </Modal>
  )
}

export default UpdateDevTeam