import axios from "axios"
import { API } from "../constants/routes"

export const getTicketStats = async()=>{

  const resp = await axios.get( API.DEV_TICKET_STATS, {
    withCredentials:true
  } )
  return resp.data;
}

//not using in any component
export const getDevTickets = async()=>{

  const resp = await axios.get( API.DEV_TICKETS, { withCredentials:true } );
  return resp.data;

}