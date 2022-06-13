const {TicketMessage} = require('../models/TicketMessage');
const { AppError } = require('./handleError');
const uuid = require('uuid')

const getTicketMessages = async (ticket_id)=>{

  if(!ticket_id) throw AppError("invalid ticket id");

  const tick_msgs = await TicketMessage.findAll({
    where:{
      ticketId:ticket_id
    }
  });

  return tick_msgs

}

const addTicketMsg = async ( payload )=>{

  const {user, room} = payload
  const tickMsg = await TicketMessage.create({
    id:uuid.v1(),
    message:payload.message,
    ticketId:room.id,
    developerId:`${user.firstname} (${user.email})`,
  });
  return tickMsg

}


module.exports = {
  getTicketMessages,
  addTicketMsg
}