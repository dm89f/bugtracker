import axios from "axios";
import { API } from "../constants/routes";


export async function getDevProject(id){

  const resp = await axios.get(`${API.PROJECT_ROUTE}/${id}`, {withCredentials:true});
  return resp.data;
}