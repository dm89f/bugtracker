import axios from "axios";
import { createContext, useContext, useReducer, useState } from "react";
import { AuthError, AppError } from '../utils/handleError';
import {API} from '../constants/routes'
const UserContext = createContext();

export const ACTIONS = {

  SAVE_DEV_INFO:'SAVE_DEV_INFO',
  REMOVE_DEV_INFO:'REMOVE_DEV_INFO'

}

function reducer( state, action ){

  switch( action.type ){

    case ACTIONS.SAVE_DEV_INFO:
      return saveDevInfo(action.payload);
    case ACTIONS.REMOVE_DEV_INFO:
      return removeDevInfo();
    default:  
      throw new Error("error in Dev reducer");

  }


}


// reducer helper methods
function saveDevInfo(developer){

  if(developer){

    localStorage.setItem( 'developer', JSON.stringify(developer) );
    return JSON.parse(localStorage.getItem('developer'));
  }else{

    throw AppError("developer data empty to save");

  }


}

function removeDevInfo(){
  
  localStorage.removeItem('developer')

}

function initUser(){

  const developer = JSON.parse( localStorage.getItem('developer') );

  return developer;

}


// custom hooks
export function useGetDev(){

  const { developer } = useContext(UserContext);

  return developer;

}

export function useGetDevLogout(){

  const {logoutDev} = useContext(UserContext);
  
  return logoutDev;

}

//email, password feilds
export function useGetDevLogin(){
  
  const {loginDev} = useContext(UserContext);  
  return loginDev;

}

export function useGetDevRegister(){

  const {registerDev} = useContext(UserContext);

  return registerDev;
}


export function UserContextProvider({children}){

  const [ user, dispatch ] = useReducer( reducer, initUser() );


  async function loginDev( devInfo ){

    const {email, password} = devInfo;
    
    const resp = await axios.post(API.LOGIN_REQ, { email, password }, {
      withCredentials:true
    });
    console.log(resp)

    if( resp.status === 200 ){
      
      const { firstname, lastname, fullname, email, phone_no,authorization } = resp.data;
      dispatch({ 
        type:ACTIONS.SAVE_DEV_INFO, 
        payload:{
          firstname, lastname, fullname, email, 
          phone_no,authorization:authorization.title,
          authId:authorization.id
        } 
      });

    }else{
      
      throw new AuthError(resp.response.data.error_msg);   

    }


  
  }

  async function logoutDev(){

    const resp = await axios({
      method:'POST',
      url:API.LOGOUT_REQ,
      withCredentials:true
    });
    


    if(resp.status === 200){
      
      dispatch( { type:ACTIONS.REMOVE_DEV_INFO } );
      console.log(resp);

    }else{
      
      throw new AppError("Not able to logout");

    }

  }

  async function registerDev(devInfo){

    const res = await axios.post( API.REGISTER_REQ,{
      ...devInfo
    } ,{
      // withCredentials:true
    })

    if(res.status === 201)  return true;
    else{

      throw AppError( res.response.data.error_msg );

    }

  }

  
  return (
    <UserContext.Provider value={{ developer:user, loginDev, logoutDev, registerDev }} >
      {
        children
      }
    </UserContext.Provider>
  )

}

