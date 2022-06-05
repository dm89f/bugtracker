import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react'
import {API} from '../constants/routes'
const TodoContext = createContext();


function TodoContextProvider({children}) {

  const [todos, setTodos] = useState([]);

  useEffect(()=>{
    refTodos();
  },[])

  async function refTodos(){

    const resp = await axios.get(API.TODOS_ROUTE, { withCredentials:true });
    setTodos(resp.data);
  }

  function getTodo( todoId ){


  }

  async function addTodo(payload){

    const data = await axios.post(API.TODOS_ROUTE, 
      {
        ...payload
      },{ withCredentials:true });
    
    refTodos();

  }

  async function editTodo( todo ){
    
    const {id, title, description, type } = todo;
    await axios.put( `${API.TODO_ROUTE}/${id}`,{
      title:title, description:description, type:type
    },
    {
      withCredentials:true 
    } 
    );
    await refTodos();
  } 

  async function deleteTodo( todoId ){
    
    await axios.delete( `${API.TODO_ROUTE}/${todoId}`,{withCredentials:true} );
    await refTodos();

  }



  return (
    <TodoContext.Provider value={
      {
        todos:todos,
        refTodos,
        getTodo,
        addTodo,
        editTodo,
        deleteTodo
      }
    }>
      {
        children
      }
    </TodoContext.Provider>
  )
}

export function useGetTodos(){
  const {todos} = useContext(TodoContext);
  return todos;
}


export function useRefTodos(){
  const {getTodos} = useContext(TodoContext);
  return getTodos;
}

export function useAddTodo(){
  const {addTodo} = useContext(TodoContext);
  return addTodo;
}

export function useEditTodo(){
  const {editTodo} = useContext(TodoContext);
  return editTodo;

}

export function useDeleteTodo(){
  const {deleteTodo} = useContext(TodoContext);
  return deleteTodo;
}

export function useGetTodo(){
    const {getTodo} = useContext(TodoContext);
    return getTodo;
}


export default TodoContextProvider