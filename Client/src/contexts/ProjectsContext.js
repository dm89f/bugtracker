import  { useReducer, createContext, useContext, useEffect } from 'react'
import axios from 'axios';
import {projectsReducer, ACTION} from './reducers/projectsReducer'
import {API} from '../constants/routes'
const ProjectsContext = createContext();




export function ProjectsContextProvider({children}){

  const [ projects, dispatch ] = useReducer(projectsReducer, {} );

  useEffect(()=>{

    getAllDevProjects();  

  },[])

  const getAllDevProjects = async()=>{    

    const resp = await  axios.get(API.CHECK_LOGGED_IN, { withCredentials:true });
    console.log(resp);
  }

  const AddNewDevProject = (projectInfo) =>{

  }
  const DeleteDevProject = (projectId ) =>{

  }
  const UpdateDevProject = ( projectInfo ) =>{

  }


  return(
    <ProjectsContext.Provider 
      value={
        {
          projects,
          AddNewDevProject,
          DeleteDevProject,
          UpdateDevProject,  
        }
      } 
    >
      {
        children
      }
    </ProjectsContext.Provider>
  )

}


export function useGetAllDevProjects(){

  return useContext(ProjectsContext);
}

export function useAddNewDevProject(){

  return useContext(ProjectsContext);
}

export function useDeleteDevProject(){

  return useContext(ProjectsContext);
}

export function useUpdateDevProject(){

  return useContext(ProjectsContext);
}






function TicketsContextProvoder(){


}