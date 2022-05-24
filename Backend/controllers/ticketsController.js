const uuid = require('uuid');
const { Ticket, Tpriority, Tstatus, Ttype, Developer, Project } = require("../models");
const { catchAsync } = require("../utils/handleError");
const{ getTicketInfo } = require('../utils/ticketUtils')


const addTicket = catchAsync( async( req, res, next )=>{
  
  const {id} = req.params;
  const { 
    title, description, time_est, 
    tpriorityId, tstatusId, 
    ttypeId
  } = req.body;

  const raised_by_dev= req.user.id;

  const ticket = await Ticket.create({
    id:uuid.v1(),
    projectId:id,
    title,
    description,
    time_est,
    tpriorityId,
    tstatusId,
    ttypeId,
    raised_by_dev
  } );

  const ticketInfo = await getTicketInfo(ticket.id);

  res.status(201).json(ticketInfo);

} )

const getTickets = catchAsync( async(req, res, next)=>{
  
  const {id} = req.params;
  const tickets = await Ticket.findAll({
    where:{
      projectId:id
    },
    include:[
      { model: Tpriority },
      { model:Tstatus },
      { model:Ttype },
      {model : Developer},
      {model:Project}
    ]
    
  })

  res.status(201).json(tickets);

} );


module.exports={
  addTicket,
  getTickets
}