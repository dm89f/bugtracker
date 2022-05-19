const res = require('express/lib/response');
const {Ticket ,Tpriority, Tstatus, Ttype, Developer, Project} = require('../models')

async function getTicketInfo(ticked_id){

  const ticket = await Ticket.findOne({
    id:ticked_id,
    include:[
      { model: Tpriority },
      { model:Tstatus },
      { model:Ttype },
      {model : Developer},
      {model:Project}
    ]
  })
  
  return ticket;

}

async function deleteTicketUtil(  ticked_id ){

  const isDeleted = await Ticket.destroy({
    where:{
      id:ticked_id
    }
  })
  
  
  return isDeleted;
}

module.exports = {
  getTicketInfo,
  deleteTicketUtil
}