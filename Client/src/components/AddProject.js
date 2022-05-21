import React, {useEffect, useState} from 'react'

import axios from 'axios';
import {API} from '../constants/routes'
import {getOpenDevs, } from '../utils/utils'
import { 
  Modal, ModalBody, ModalHeader, ModalFooter ,
  Form, FormGroup, Label, Input, Button
} from 'reactstrap'

import {useAddNewDevProject, useRefDevProjects} from '../contexts/ProjectsContext'
import { useAddProjTeam }  from '../contexts/DevTeamCtx'

function AddProject({addProj, toggleAddProj}) {
  
  
  const [openDevs, setOpenDevs] = useState([]);
  const [projTeam, setProjTeam] = useState([]);
  const [projTitle, setProjTitle] = useState('');
  const [projDesc, setProjDesc] = useState('');
  const addProjectTeam = useAddProjTeam()
  const addNewDevProject = useAddNewDevProject();
  const refDevProjects = useRefDevProjects();
  useEffect(()=>{

    if(addProj){
      getOpenDevs()
      .then((devs)=>{
        if(devs){
            setOpenDevs(devs);
        }
      })
    }

  },[addProj])
  
  async function handleSubmit(e){
    
    e.preventDefault();

    try{
      
      const title = projTitle;
      const description = projDesc;
      const newProject = await addNewDevProject( { title, description } );
      const newTeam = await addProjectTeam(newProject.id, projTeam);
      refDevProjects();
      setProjTeam([])
      setProjTitle('')
      setProjDesc('')
      toggleAddProj((prev)=>(!prev))

    }catch(error){
      
      console.log(error);

    }

    setProjDesc('')
    setProjTitle('');
  }

  function handleChange(e){
    
    if(e.target.checked){
      setProjTeam([ ...projTeam, e.target.value]);
    }
  }

  return (
    <Modal isOpen={addProj} keyboard={true} >
      <ModalHeader toggle={()=>{ toggleAddProj((prev)=>(!prev)) }}>
        Add New Project
      </ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor='title'>
              Project Title
            </Label>
            <Input required id='title' onChange={(e)=>{ setProjTitle(e.target.value) }} value={projTitle}  type='text'>
                
            </Input>
          </FormGroup>
          <FormGroup>
            <Label  htmlFor='description' >Description</Label>
            <Input  required id="description" 
              onChange={(e)=>{ setProjDesc(e.target.value) }} value={projDesc}
              type='textarea' 
            ></Input>
          </FormGroup>
          <FormGroup className='open-devs'>
            {
              openDevs.map((dev)=>{
                return(
                  <div key={dev.devId}>
                    <Input id={`${dev.devId}`} name='devTeam[]' 
                      value={dev.devId} 
                      onChange={handleChange}
                      type="checkbox" 
                      />
                    <label className='ms-3' htmlFor={`${dev.devId}`}>{dev.fullname} </label>
                  </div>
                )
              })
            }
            
          </FormGroup>
          <ModalFooter >
            <Button className='me-auto' type='submit' >Submit</Button>
            <Button onClick={()=>{ toggleAddProj((prev)=>(!prev)) }} className='ms-auto btn-danger' >Close</Button>
          </ModalFooter>
        </Form>

      </ModalBody>

    </Modal>
  )
}

export default AddProject