import React, { useEffect, useState } from 'react'

import { Button } from 'reactstrap'
import { isArray } from '../utils/utils';
import { useGetTodos, useRefTodos, } from '../contexts/TodoContext'
import Todo from '../components/Todo';
import NewTodo from '../components/NewTodo';
import {FaPlusCircle} from 'react-icons/fa';

function Todos() {

  const todos = useGetTodos();
  const [addTodo, setAddTodo] = useState(false);
  
  function toggleAddTodo(){
    setAddTodo( (prev)=>(!prev) );
  }


  return (
   <section className='todos_hero'>
     <NewTodo addTodo={addTodo} toggleAddTodo={toggleAddTodo} />
    <div >
      <Button className="btn ms-3" onClick={toggleAddTodo} color='primary' > <FaPlusCircle/> new Todo </Button>
    </div>
    <div className='todos-contnr mt-2' >
      {
        isArray(todos)&&todos.map( (todo)=>{

          return <Todo key={todo.id} todo={todo}/>
        
        } )
      }
    </div>

   </section>


  )
}

export default Todos