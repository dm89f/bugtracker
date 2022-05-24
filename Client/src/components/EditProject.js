import React, {useEffect, useState} from 'react'
import axios from 'axios';
import { 
  Modal, ModalBody, ModalHeader, ModalFooter ,
  Form, FormGroup, Label, Input, Button,
} from 'reactstrap';

import {API} from '../constants/routes';
import {getOpenDevs, } from '../utils/utils';
import {useAddNewDevProject, useRefDevProjects, useUpdateDevProject  } from '../contexts/ProjectsContext';

function EditProject({editProj, projectInfo}) {
   
  const [openDevs, setOpenDevs] = useState([]);
  const [projTeam, setProjTeam] = useState({ "project_team":[] });
  const [projTitle, setProjTitle] = useState('');
  const [projDesc, setProjDesc] = useState('');
  const updateDevProject = useUpdateDevProject();
  const updateProjTeam = useUpdateDevProject();
  const refDevProjects = useRefDevProjects();
  const [ editModal, toggleEditModal ] = useState(false);

  useEffect(()=>{

    getOpenDevs()
    .then(val=>{
      setOpenDevs(val)
    })

    if( projectInfo && projectInfo.id ){
      toggleEditModal(true);
      setProjTitle(projectInfo.title);
      setProjDesc(projectInfo.description);
    }else{
      toggleEditModal(false);
    }

  },[projectInfo])

  
  async function handleSubmit(e){
    
    e.preventDefault();

    try{
      
      const title = projTitle;
      const description = projDesc;
      const updProject = await updateDevProject({id:projectInfo.id, title, description});
      const updTeam = await updateProjTeam(projectInfo.id, projTeam.project_team);
      refDevProjects();
      setProjTeam({ "project_team":[] })
      setProjTitle('')
      setProjDesc('')

    }catch(error){
      
      console.log(error);

    }

  }

  function handleChange(e){
  
    const selectedDevs = e.target.selectedOptions;
    let sDev = Array.from(selectedDevs, option=> option.value );
    sDev = sDev.filter( (option)=>{
      if(option.length !== 0) return sDev;
    } )

    setProjTeam({ [e.target.name]:sDev });
    console.log(projTeam)
  }



  return (
    <Modal isOpen={editModal} keyboard={true} >
      <ModalHeader toggle={()=>{ toggleEditModal((prev)=>(!prev)) }}>
        Edit Project
      </ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit} id="add_proj">
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
          <FormGroup className='open-devs p-1'>
            <label htmlFor={`project_team`}> Select Project Team</label>
            <select  
              className={"form-select"}
              required
              name={`project_team`} 
              id={`project_team`} 
              value={projTeam.project_team}
              onChange={handleChange}
              multiple={true}
            >
            <option value={""} >-- SELECT TEAM ---</option>
            {
              openDevs.map( (dev)=>{
                return (
                  <option key={dev.devId} value={dev.devId}>
                    {dev.fullname}
                  </option>
                )
              } )
            } 
            </select>
           <p className={`text-muted fw-lighter`}>hold shift while selecting</p>
          </FormGroup>

          <ModalFooter >
            <Button className='me-auto' type='submit' >Submit</Button>
            <Button onClick={()=>{ toggleEditModal((prev)=>(!prev)) }} className='ms-auto btn-danger' >Close</Button>
          </ModalFooter>
        </Form>

      </ModalBody>

    </Modal>
  )
}

export default EditProject