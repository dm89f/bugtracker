import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { API } from "../constants/routes";

const TicketsContext = createContext();



export function TicketsCtxProvider( {children, projectId} ){

  const [ tickets, setTickets ] = useState([]);

  useEffect(()=>{
    refTickets(projectId)
  },[])

  async function refTickets(projectId){
    
    try{
  
      const resp =await axios.get( `${API.PROJECT_ROUTE}/${projectId}/tickets`,{withCredentials:true } );
      setTickets(resp.data);

    }catch(err){
      console.log(err )
    }   

  }


  async function addTicket(ticketInfo){


  }

  async function updateTicket(ticketId){



  }


  async function deleteTicket(ticketId){



  }




  return(
    <TicketsContext.Provider value={{ tickets:tickets }} >
      {
        children
      }
    </TicketsContext.Provider>
  )


}


export function useProjTickets(){
  
  const {tickets} = useContext(TicketsContext);
  return tickets;
}