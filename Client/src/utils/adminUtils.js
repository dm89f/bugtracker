import axios from "axios";
import {API} from '../constants/routes'

export async function getDevInfoUtil(devId){
  
  const resp = await axios.get( `http://localhost:3001/api_v1/dev/admin/devs/${devId}`,{  withCredentials:true } );
  return resp.data;

}

export async function getAllDevs(){

  const resp = await axios.get( API.GET_DEVS, {withCredentials:true} );
  return resp.data;

}


export async function updateDevRole(devId, role){

  const resp = await  axios.put( `http://localhost:3001/api_v1/dev/admin/devs/${devId}`,
  {title:role},
  {  withCredentials:true } )

}