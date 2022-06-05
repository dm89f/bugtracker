import React, { useState } from 'react'

import { Modal, ModalHeader, ModalFooter,Form, ModalBody, Button, FormGroup, Input, Label } from 'reactstrap'

import { useAddTodo } from '../contexts/TodoContext'

function NewTodo({ addTodo, toggleAddTodo }) {

  const [title, setTitle] = useState('')
  const [ description, setDescription ] = useState('')
  const [ type, setType ] = useState('active')
  const saveTodo = useAddTodo();

  const handleSubmit = async(e)=>{

    e.preventDefault();
    try{
    
      await saveTodo({ title, description, type });
      setTitle('');
      setDescription('');
      setType('active');
      toggleAddTodo();
    
    }catch(err){

      console.log(err);
    
    }

  }


  return (
    <Modal isOpen={addTodo} toggle={toggleAddTodo}>
      <ModalHeader toggle={toggleAddTodo}>
        New Todo
      </ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="title"  >Title : </Label>
            <Input required id="title" value={title} onChange={(e)=>{ setTitle(e.target.value) }}  />
          </FormGroup>
          <FormGroup>
            <Label htmlFor='description'>Description:</Label>
            <Input required id='description'
              type='textarea'
              value={description}
              onChange={(e)=>{setDescription(e.target.value)}}
            ></Input>
          </FormGroup>
          <FormGroup>
            <Input
              checked
              required
              id='active'
              type='radio'
              onChange={(e)=>{ if(e.target.checked) setType("active") }}
              name="type"
            />{" "}
            <Label htmlFor='active'>Active</Label>
          </FormGroup>
          <FormGroup>
            <Input
                id='finished'
                type='radio'
                onChange={(e)=>{ if(e.target.checked) setType("finished") }}
                name="type"
            />{" "}
              <Label htmlFor='finished'>Finished</Label>
          </FormGroup>
          <ModalFooter className='d-flex justify-content-between'>
            <Button color='danger' onClick={toggleAddTodo}>Close</Button>
            <Button color='success' type='submit'>Add</Button>
          </ModalFooter>
        </Form>
      </ModalBody>

    </Modal>
  )
}

export default NewTodo