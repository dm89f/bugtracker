import  { useReducer, createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios';
import {API} from '../constants/routes'
const ProjectsContext = createContext();




export function ProjectsContextProvider({children}){

  const [ projects, setProjects ] = useState([]);

  useEffect(()=>{

    refDevProjects();  

  },[])

  const refDevProjects = async()=>{    

    const resp = await  axios.get( API.PROJECTS_REQ, { withCredentials:true } );
    setProjects(resp.data)

  }

  const addNewDevProject = async (projectInfo) =>{
    
    const resp = await axios.post( API.ADD_NEW_PROJECT,{
      ...projectInfo
      },{
        withCredentials:true
      }  
    );
    refDevProjects();
    return resp.data;
  }
  
  const deleteDevProject = async (projectId ) =>{
    
    await axios.delete( `${API.PROJECT_ROUTE}/${projectId}`, {
      withCredentials:true
    } )
    refDevProjects();  
  }

  const updateDevProject = async ( projectInfo ) =>{
   
    const updProject = await axios.put( `${API.PROJECT_ROUTE}/${projectInfo.id}`,{
      title:projectInfo.title,
      description:projectInfo.description
    },{
      withCredentials:true
    } );
    await refDevProjects();
    return updProject.data;
  }


  return(
    <ProjectsContext.Provider 
      value={
        {
          refDevProjects,
          projects:projects,
          addNewDevProject,
          deleteDevProject,
          updateDevProject,  
          
        }
      } 
    >
      {
        children
      }
    </ProjectsContext.Provider>
  )

}


export function useRefDevProjects(){
  const {refDevProjects} = useContext(ProjectsContext);
  return refDevProjects;
}

export function useGetAllDevProjects(){
  const {projects} = useContext(ProjectsContext);
  return projects;
}

export function useAddNewDevProject(){
  const {addNewDevProject} = useContext(ProjectsContext); 
  return addNewDevProject;
}

export function useDeleteDevProject(){

  const {deleteDevProject} = useContext(ProjectsContext);
  return deleteDevProject;
}

export function useUpdateDevProject(){

  const {updateDevProject} = useContext(ProjectsContext);

  return updateDevProject;
}



