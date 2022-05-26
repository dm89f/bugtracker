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


  async function addTicketHook(ticketInfo){

    const resp = await axios.post( `${API.PROJECT_ROUTE}/${projectId}/tickets`,{
      ...ticketInfo
    },{
      withCredentials:true
    } )
    await refTickets(projectId);
    return resp.data;
  }

  async function updateTicket(ticketId, ticketInfo){

    const resp = await axios.put( `${API.PROJECT_ROUTE}/${projectId}/ticket/${ticketId}`,ticketInfo, {  
      withCredentials:true 
    } );

    await refTickets(projectId);

  }


  async function deleteTicket(ticketId){
    
    const resp = await axios.delete( 
        `${API.PROJECT_ROUTE}/${projectId}/ticket/${ticketId}`, { withCredentials:true  } 
    );
    
    await refTickets(projectId);    
    console.log(resp);
  }

  async function addTicketTeam(ticketId, devs ){

    const resp = await axios.post( `${API.PROJECT_ROUTE}/${projectId}/ticket/${ticketId}/team`,{
      devs
    },{
      withCredentials:true
    } )

    await refTickets(projectId);
    // return resp;
  }
  
  async function updateTicketTeam(ticketId, teamInfo ){
  
    const resp = await axios.put( `${API.PROJECT_ROUTE}/${projectId}/ticket/${ticketId}/team`,{
      devs:teamInfo
    },{
      withCredentials:true
    } )

    await refTickets(projectId);
    return resp.data;
  }
  
  



  return(
    <TicketsContext.Provider value={
      { 
        tickets:tickets, 
        addTicketHook,
        updateTicket,
        deleteTicket,
        addTicketTeam,
        updateTicketTeam
      }
    } >
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


export function useAddTicket(){
  const {addTicketHook} = useContext(TicketsContext);
  return addTicketHook;
}


export function useUpdateTicket(){
  const {updateTicket} = useContext(TicketsContext);
  return updateTicket;
}


export function useDeleteTicket(){
  const {deleteTicket} = useContext(TicketsContext);
  return deleteTicket;
}


export function useAddTicketTeam(){
  const {addTicketTeam} = useContext(TicketsContext);
  return addTicketTeam;
}


export function useUpdateTicketTeam(){
  const {updateTicketTeam} = useContext(TicketsContext);
  return updateTicketTeam;
}