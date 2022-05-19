const { Ticket, Tpriority, Tstatus, Ttype, Developer, Project } = require('../models');
const {catchAsync, AppError} = require('../utils/handleError');
const { getTicketInfo,deleteTicketUtil } = require('../utils/ticketUtils')

const getTicket = catchAsync( async(req, res, next)=>{

  const{tid} = req.params;
  const ticket = await Ticket.findOne({
    where:{
      id:tid
    },
    include:[
      { model: Tpriority },
      { model:Tstatus },
      { model:Ttype },
      {model : Developer},
      {model:Project}
    ]
  })
  
  res.status(201).json(ticket);

})

const updateTicket = catchAsync( async(req, res, next)=>{
  
  const { tid } = req.params;

  const {
    title, description, time_est, 
    tpriorityId, tstatusId, 
    ttypeId
  } = req.body;


  await Ticket.update( { 
      title, description, time_est, 
      tpriorityId, tstatusId, ttypeId
    },
   {
     where:{
       id:tid
     }
   }
  )

  const upTicket = await getTicketInfo(tid);
  if( upTicket ) res.status(201).json(upTicket);
  else{
    throw new AppError( "updating ticket failed", 400 );
  }

} )

const deleteTicket = catchAsync( async (req, res, next)=>{

  const {tid} = req.params;
  const delTicket = await deleteTicketUtil(tid);
  if(delTicket) res.status(200).json({"msg":"Deleted Ticket"});
  else throw new AppError( "ticket not able to delete" );
} );


module.exports={
  getTicket,
  updateTicket,
  deleteTicket
}