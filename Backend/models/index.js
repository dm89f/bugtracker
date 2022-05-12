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
}

initModels();

module.exports = {
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