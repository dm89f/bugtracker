const {Authorization} = require('./AuthorizationModel');
const {DevTeam} = require('./DevTeamModel');
const {Developer} = require('./DeveloperModel');
const {Project} = require('./ProjectModel');
const {TicketAssignedDev} = require('./TicketHandlingDevs');
const {Ticket} = require('./TicketModel');
const {Tpriority} = require('./Tpriority');
const {Tstatus} = require('./TstatusModel');
const {Ttype} = require('./TtypeModel');
const { SecQstn } = require('./SecQstnModel')
const {TicketTeam} = require('./TicketTeam');
const {Todo} = require('./TodoModel')
initModels();


async function initModels(){

  await Tstatus.sync( {alter:true} );
  await Ttype.sync( { alter:true } );
  await Tpriority.sync( { alter:true } );
  await Authorization.sync( { alter:true } );
  await SecQstn.sync( {alter:true} );
  await Developer.sync( { alter:true } );
  await Project.sync( { alter:true } );
  await Ticket.sync( { alter:false } );
  await TicketAssignedDev.sync( {alter:true} );
  await DevTeam.sync( {alter:true} )
  await TicketTeam.sync( {alter:true} );
  await Todo.sync( { alter:false } );
}



const isSeniorDev = async(userAuthId)=>{
  const auth = await Authorization.findOne({
    where:{
      title:'senior dev'
    }
  })

  return userAuthId === auth.id;
}


const isJuniorDev = async(userAuthId)=>{
 const auth = await Authorization.findOne({
   where:{
     title:'junior dev'
   }
 })

 return userAuthId === auth.id;
}

const isAdmin = async(userAuthId)=>{
 const auth = await Authorization.findOne({
   where:{
     title:'admin'
   }
 })

 return userAuthId === auth.id;
}




module.exports = {
    isSeniorDev,
    isJuniorDev,
    isAdmin,
    Authorization,
    DevTeam,
    Developer,
    Project,
    TicketAssignedDev,
    Ticket,
    TicketTeam,
    Tpriority,
    Tstatus,
    Ttype,
    SecQstn,
    Todo
}