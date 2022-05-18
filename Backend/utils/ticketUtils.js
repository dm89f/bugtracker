const {T ,Tpriority, Tstatus, Ttype, Developer, Project} = require('../models')

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

module.exports = {
  getTicketInfo
}