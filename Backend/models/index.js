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

const AUTH={
  SENIORDEV:'',
  JUNIORDEV:'',
  ADMINDEV:''
} 

initModels();





async function initModels(){

  await Tstatus.sync( {alter:true} );
  await Ttype.sync( { alter:true } );
  await Tpriority.sync( { alter:true } );
  await Authorization.sync( { alter:true } );
  await Developer.sync( { alter:true } );
  await Project.sync( { alter:true } );
  await Ticket.sync( { alter:true } );
  await TicketAssignedDev.sync( {alter:true} );
  await DevTeam.sync( {alter:true} )
  await SecQstn.sync( {alter:true} );
  await setAuthIds();


}

async function setAuthIds(){

  AUTH.SENIORDEV = await getSeniorDevAuthId();
  AUTH.JUNIORDEV = await getJuniorDevAuthId();
  AUTH.ADMINDEV = await getAdminAuthId();

}



const getSeniorDevAuthId = async()=>{
  const auth = await Authorization.findOne({
    where:{
      title:'senior dev'
    }
  })

  return auth.id;
}


const getJuniorDevAuthId = async()=>{
 const auth = await Authorization.findOne({
   where:{
     title:'junior dev'
   }
 })

 return auth.id;
}

const getAdminAuthId = async()=>{
 const auth = await Authorization.findOne({
   where:{
     title:'admin'
   }
 })

 return auth.id;
}




module.exports = {
    AUTH,
    Authorization,
    DevTeam,
    Developer,
    Project,
    TicketAssignedDev,
    Ticket,
    Tpriority,
    Tstatus,
    Ttype,
    SecQstn
}