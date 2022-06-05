import React, { useState } from 'react'

import {useEditTodo, useDeleteTodo} from '../contexts/TodoContext'
import { Button, Card , CardBody, CardFooter, CardHeader,Input, FormGroup, Label   } from 'reactstrap' 
import {FaEdit} from 'react-icons/fa';
// import {FiMoreVertical} from 'react-icons/fi';
import {MdDelete} from 'react-icons/md';


function Todo({todo}) {

  const[edit, toggleEdit] = useState(false);
  const [title ,setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);
  const [ type, setType ] = useState(todo.type)
  const editTodo = useEditTodo();
  const deleteTodo = useDeleteTodo();


  const handleSubmit = async(e)=>{
    
    e.preventDefault();
    try{

      await editTodo( { id:todo.id, title, description, type } );
      handleReset();
    }catch(err){
      console.log(err);
    }

  }
  const handleReset = ()=>{
    setTitle(todo.title);
    setDescription(todo.description);
    setType(todo.type);
    toggleEdit(false);
  }

  const handleDelete = async()=>{
    try{
      await deleteTodo(todo.id);
    }catch(err){
      console.log(err)
    }
  }


  return (
    <Card className='shadow todo-card'>
      <CardHeader>
        {
          edit ? 
            <div>
              <Input
                required
                value={title} onChange={(e)=>setTitle(e.target.value)}
              />
            </div>
            :
            <div className='d-flex justify-content-between' > 
              <h5 className=''>{title}</h5> 
              <div className="dropdown">
                <button className="btn-sm btn-primary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                  more
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                  <li>
                    <a
                      onClick={()=>{ toggleEdit((prev)=>(!prev)) }} 
                      className="dropdown-item" href="#"><FaEdit color='blue'
                    /> Edit</a></li>
                  <li>
                    <a 

                      onClick={handleDelete}    
                      className="dropdown-item" href="#"
                    >
                        <MdDelete color='red' /> Remove
                    </a>
                  </li>
                </ul>
              </div>
            </div>
        }
        
      </CardHeader>
      <CardBody>
       {
        edit ? 
          <div> 
            <Input 
              required
              type='textarea' value={description} onChange={(e)=>{setDescription(e.target.value)}} 
            /> 
            <FormGroup className='mt-2' >
              <Input
                id='type-finished'
                name="radio1"
                type="radio"
                value='finished'
                onChange={ (e)=>{ if(e.target.checked) setType("finished") } }

              />
              {' '}
              <Label 
                htmlFor='type-finished'
                
              >
                finished
              </Label>
            </FormGroup>
            <FormGroup >
              <Input
                id='type-active'
                name="radio1"
                type="radio"
                value='active'
                onChange={ (e)=>{ if(e.target.checked) setType("active") } }
              
              />
              {' '}
              <Label 
                htmlFor='type-active'
                
              >
                active
              </Label>
            </FormGroup>
          </div> 
          : 
          <p>
            {todo.description}
          </p>
      }
      </CardBody>
      {
        edit
        &&
        <CardFooter className='d-flex justify-content-between'>
        <Button 
          onClick={handleReset}
          size='sm' color='info' 
        >
          Reset
        </Button>
        <Button 
          onClick={handleSubmit}
          size='sm' color='success' 
        >
          Save
        </Button>
      </CardFooter>
      }

    </Card>
  )
}

export default Todo