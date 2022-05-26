const { Ticket, Tpriority, Tstatus, Ttype, Developer, Project, TicketTeam } = require('../models');
const {catchAsync, AppError} = require('../utils/handleError');
const { getTicketInfo,deleteTicketUtil } = require('../utils/ticketUtils')
const { isArray } = require('../utils/utils')

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

const getTicketTeam = catchAsync( async(req, res, next)=>{
  
  const {tid}  = req.params;
  const team = await TicketTeam.findAll({
    where:{
      ticketId:tid
    }
  })

  let dev = []
  for( let item of team ){

    const data = await Developer.findOne({
      where:{
        id:item.developerId
      }
    })

    dev.push(data);

  }

  let ticketTeam = { ticketId:tid, team:dev };
  res.json(ticketTeam); 

})


const addTicketTeam =catchAsync( async(req, res, next)=>{

  const {tid}  = req.params;
  const {devs} =req.body;
  
  if( !isArray(devs) && devs.length >0 ) throw new AppError("devs is not array",400)

  for ( let devId of devs ){
    await TicketTeam.create(
      { ticketId:tid, developerId:devId }
    );
  }

  res.json(devs)

} )

const updateTicketTeam =catchAsync( async(req, res, next)=>{

  const {tid}  = req.params;
  const {devs} =req.body;
  
  if( !isArray(devs) && devs.length>0 ) throw new AppError("devs is not array",400)

  await TicketTeam.destroy({});

  for ( let devId of devs ){
    await TicketTeam.create(
      { ticketId:tid, developerId:devId }
    );
  }

  res.json(devs)


} )



module.exports={
  getTicket,
  updateTicket,
  deleteTicket,
  addTicketTeam,
  updateTicketTeam,
  getTicketTeam
}