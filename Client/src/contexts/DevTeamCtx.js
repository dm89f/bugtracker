import  { useReducer, createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios';
import {API} from '../constants/routes'

const DevTeamContext = createContext();


export function useGetProjTeam(){

  const {getProjectTeam} = useContext(DevTeamContext);
  return getProjectTeam;
}

export function useProjTeam(){
  const {projTeam} = useContext(DevTeamContext);
  return projTeam;
}


export function useAddProjTeam(){
  const {addProjectTeam} = useContext(DevTeamContext);
  return addProjectTeam;
}

export function useUpdateProjTeam(){
  const {updateProjectTeam} = useContext(DevTeamContext);
  return updateProjectTeam;
}


export function DevTeamContextProvider({ children }){

  const [ projTeam, setProjTeam ] = useState({});


  const getProjectTeam = async (projectId)=>{
    
    const resp = await axios.get( `${API.PROJECT_ROUTE}/${projectId}/team` , {withCredentials:true});
    const team = resp.data;
    setProjTeam( { projectId:projectId, team:team } );
    return projTeam;
  }

  const addProjectTeam = async (projectId, projTeam)=>{
    
   
    const resp = await axios.post( `${API.PROJECT_ROUTE}/${projectId}/team` , 
      { assignedDevs:projTeam },
      {withCredentials:true}
    );
    const team = resp.data;
    setProjTeam( { projectId:projectId, team:team } );

  }

  const updateProjectTeam = async (projectId, projTeam)=>{

    const resp = await axios.put( `${API.PROJECT_ROUTE}/${projectId}/team` , 
      { assignedDevs:projTeam },
      {withCredentials:true}
    );
    const team = resp.data;
    setProjTeam( { projectId:projectId, team:team } );

  }


  return(
    <DevTeamContext.Provider value={ 
        {
          projTeam:projTeam, getProjectTeam, addProjectTeam, updateProjectTeam
        } 
      }  
    >
      {
        children
      }
    </DevTeamContext.Provider>
  );

}