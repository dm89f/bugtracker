import React, { useEffect, useState } from 'react'

import { Button } from 'reactstrap'
import { isArray } from '../utils/utils';
import { useGetTodos, useRefTodos, } from '../contexts/TodoContext'
import Todo from '../components/Todo';
import NewTodo from '../components/NewTodo';
import {FaPlusCircle} from 'react-icons/fa';
import { useTheme } from '../contexts/ThemeContext';
import {useSetTabTitle} from '../contexts/RouteTitleContext'


function Todos() {

  const todos = useGetTodos();
  const [addTodo, setAddTodo] = useState(false);
  const darkTheme = useTheme();
  const setTabTitle = useSetTabTitle();

  useEffect(()=>{
    setTabTitle("Todos")
  },[])

  function toggleAddTodo(){
    setAddTodo( (prev)=>(!prev) );
  }


  return (
   <section className='todos_hero'>
     <NewTodo addTodo={addTodo} toggleAddTodo={toggleAddTodo} />

    
    <div className=' mt-2' >
      <div className='d-flex justify-content-between'>
        <p className={`fs-3 ms-3 mb-0 mt-2 ${darkTheme&&"text-light"}`}>Active Todos</p>
        <div >
          <Button 
            className={`btn btn-primary me-4 ${darkTheme?"d-theme":""}`} 
            onClick={toggleAddTodo}
          > 
          <FaPlusCircle/>{" "} 
            new Todo 
          </Button>
        </div>
      </div>
      <div className='todos-contnr'>
        {
          isArray(todos)&&todos.sort(( a, b)=>{
            return new Date(b.createdAt) - new Date(a.createdAt);
          })
          .filter( (todo)=>{
            return todo.type !== 'finished'
          } )
          .map( (todo)=>{
            return <Todo key={todo.id} todo={todo}/>
          
          } )
        }
      </div>
    </div>
    <div className='' >
      <p className={`fs-3 ms-3 mb-0 mt-2 ${darkTheme &&"text-light"}`}>Finished Todos</p>
      <div className='todos-contnr mt-2'>
        {
          isArray(todos)&&todos.sort(( a, b)=>{
            return new Date(b.createdAt) - new Date(a.createdAt);
          })
          .filter( (todo)=>{
            return todo.type === 'finished'
          } )
          .map( (todo)=>{
            return <Todo key={todo.id} todo={todo}/>
          
          } )
        }
      </div>
    </div>

   </section>


  )
}

export default Todos