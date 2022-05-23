export const ACTION = {
  INIT_PROJECTS:"INIT_PROJECTS",
  ADD_PROJECT:"ADD_PROJECT",
  UPDATE_PROJECT:"UPDATE_PROJECT",
  DELETE_ROJECT:"DELETE_ROJECT",
}


export function projectsReducer( state, action ){

  switch(action.type){

    case ACTION.INIT_PROJECTS:
      return action.payload;
    case ACTION.ADD_PROJECT:
      return addProject( state, action.payload );
    case ACTION.ADD_PROJECT:
      return updateProject( state, action.payload );
    case ACTION.DELETE_ROJECT:
      return deleteProject(state, action.payload);


  }

}


function addProject(state, newProject){

}


function updateProject( state, project ){

}


function deleteProject( state, project ){

}