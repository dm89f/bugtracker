import axios from "axios";
import { API } from "../constants/routes";

export async function getTicketType(){

  const resp = await axios.get( `${API.TICKET_TYPES}`,{ withCredentials:true } );
  return resp.data;
  
}

export async function getTicketStatus(){
  const resp = await axios.get( `${API.TICKET_STATUSES}`,{ withCredentials:true } );
  return resp.data;
}

export async function getTicketPriority(){
  const resp = await axios.get( `${API.TICKET_PRIORITIES}`,{ withCredentials:true } );
  return resp.data;
}