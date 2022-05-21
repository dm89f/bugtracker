import  { useReducer, createContext, useContext, useEffect } from 'react'
import axios from 'axios';
import {projectsReducer, ACTION} from './reducers/projectsReducer'
import {API} from '../constants/routes'
const ProjectsContext = createContext();




export function ProjectsContextProvider({children}){

  const [ projects, dispatch ] = useReducer(projectsReducer, {} );

  useEffect(()=>{

    refDevProjects();  

  },[])

  const refDevProjects = async()=>{    

    const resp = await  axios.get(API.PROJECTS_REQ, { withCredentials:true });
    let newProjects = resp.data;
    dispatch({ type:ACTION.INIT_PROJECTS, payload:newProjects });

  }

  const addNewDevProject = async (projectInfo) =>{
    
    const resp = await axios.post( API.ADD_NEW_PROJECT,{
      ...projectInfo
      },{
        withCredentials:true
      }  
    );
    const newProject = resp.data;
    return newProject;

  }
  const deleteDevProject = async (projectId ) =>{

  }
  const updateDevProject = async ( projectInfo ) =>{

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



