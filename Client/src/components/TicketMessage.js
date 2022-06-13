import React, { useEffect, useState } from 'react'
import { Button } from 'reactstrap'
import {MdOutlineSend} from 'react-icons/md'
import { toast } from 'react-toastify';
import { useGetDev} from '../contexts/UserContext'

// room =>
// {
    // name
    // id
// }

function TicketMessage( params ) {

  const { 
    ticket, socket, 
    histMsg, setHistMsg
  } = params;

  const [ messageSend, setMessageSend ] = useState("");
  const [ messageRec, setMessageRec ] = useState("hello");
  const dev = useGetDev();

  socket.on( "receive_msg", (data)=>{
    console.log(data);
    setHistMsg( [ ...histMsg, { ...data.tickMsg } ] )
  } );


  const handleSendMessage = (e)=>{
    e.preventDefault();
    
    if( messageSend !== '' ){
      socket.emit( "send_msg", 
        { room:{ id:ticket.id, name:ticket.title }, 
          user:dev,
          message:messageSend
        }, (resp)=>{
          console.log(resp)
        }
      );
      setMessageSend("");
    }

  }


  return (
    <div
      className='shadow card mt-3'>
        <div className='card-header'>
          { ticket.title||"Select Ticket" }
        </div>
        <div 
          className='card-body ticket-msg'
        >
          {
            histMsg&&histMsg.map( (item)=>{
              return(
                <span 
                  className={`msg  ${item.developerId===`${dev.firstname} (${dev.email})`?"msg-right":"msg-left"}`} 
                  key={item.id}
                >
                  <p className='msg-heading '>{item.developerId}</p>
                  {
                    item.message
                  }
                </span>
              ) 
            } ).reverse() 
          }
        </div>
        <div className='card-footer'> 
        <form onSubmit={ handleSendMessage }  >
          <div className="input-group">
            <input type="text" 
              className="form-control"
              placeholder="Enter Message"
              value={ messageSend }
              onChange={ (e)=>{ setMessageSend(e.target.value) } }  
              // required
            />
            {
              ticket.id ?
             ( <button className="btn btn-primary" type="submit" >
              <MdOutlineSend size={25} />
             </button>) :
              (
                <button className="btn btn-primary" 
                  disabled
                  type="submit" >
                  <MdOutlineSend size={25} />
                </button> 
              )
            }
                           
          </div>
        </form>
        </div>
    </div>
  );
  
}

export default TicketMessage