import axios from "axios";
import {API} from '../constants/routes'

export const getProjectTeam = async (projectId)=>{
    
  const resp = await axios.get( `${API.PROJECT_ROUTE}/${projectId}/team` , {withCredentials:true});
  const team = resp.data;
  return team;
}

export const addProjectTeam = async (projectId, projTeam)=>{
  const resp = await axios.post( `${API.PROJECT_ROUTE}/${projectId}/team` , 
    { assignedDevs:projTeam },
    {withCredentials:true}
  );
  const team = resp.data;
  return team;

}

export const updateProjectTeam = async (projectId, projTeam)=>{

  const resp = await axios.put( `${API.PROJECT_ROUTE}/${projectId}/team` , 
    { assignedDevs:projTeam },
    {withCredentials:true}
  );
  const team = resp.data;
  return team;

}