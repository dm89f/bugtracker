import axios from 'axios'
import {API} from '../constants/routes'

export async function getOpenDevs(){
  
  const res = await axios.get(API.GET_OPEN_DEVS,{ withCredentials:true });
  const openDevs = res.data;
  return openDevs;
}

export function isArray ( obj ) { 
  return isObject(obj) && (obj instanceof Array);
}


export function isObject ( obj ) {
  return obj && (typeof obj  === "object");
}
