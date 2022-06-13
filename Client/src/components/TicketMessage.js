import React, { useEffect, useState } from 'react'
import { Button } from 'reactstrap'
import io from 'socket.io-client'
import {MdOutlineSend} from 'react-icons/md'
const socket = io("http://localhost:3001");


function TicketMessage( { ticketId } ) {

  const [ allMessage, setAllMessage ] = useState([]); 
  const [message, setMessage] = useState('');


  useEffect(()=>{

    socket.on("message",(data)=>{
      alert(data);
    })
    
  }, [socket])



  return (
    <div 
      className='shadow card mt-3'>
        <div className='card-header'>
          Messages
        </div>
        <div className='card-body'>
        
        </div>
        <div className='card-footer'> 
        <form  >
          <div className="input-group mb-3">
            <input type="text" 
              className="form-control"
              placeholder="Enter Message"
              value={ message }
              onChange={ (e)=>{ setMessage(e.target.value) } }  
            />
            <button className="btn btn-primary" type="submit" >
              <MdOutlineSend size={25} />
            </button>                
          </div>
        </form>
        </div>
    </div>
  )
}

export default TicketMessage