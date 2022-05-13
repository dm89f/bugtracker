import axios from 'axios'
import React, { useEffect } from 'react'
import {
  useNavigate
} from 'react-router-dom'


export const IndexPage = () => {

  const navigate = useNavigate();

  // useEffect(()=>{

  //   axios.get('/api_v1/projects')
  //     .then( res=>{
        
  //       if(res.status === 200){
  //         console.log("inside index Route");
  //         console.log(res.data);

  //       }else{
  //         navigate('/auth/login');        
  //       }

  //     } )
  //     .catch(error =>{
  //       console.error(error);
  //       navigate('/auth/login');        

  //     });
  // },[])

  return (
    <div>IndexPage</div>
  )
}
