const { catchAsync } = require("../utils/handleError");
const { Developer, DevTeam, Ticket, Project, SecQstn, Tpriority, Tstatus, Ttype  } = require('../models')
const {genPswdHash} = require('../config/passportConfig');
const { getDevStats } = require('../utils/devUtil')


const getDevInfo = catchAsync( async (req, res, next)=>{

  const {
    no_tickets_raised , 
    no_projects_contributed, no_team } = await getDevStats(req.user.id);

  res.status(200).json({ 
    no_tickets_raised , no_projects_contributed , no_team
  })

} )

const resetPswd = catchAsync( async(req, res, next)=>{

  const { selSecQstn, secAns, pswd } = req.body;

  const secQstn = await SecQstn.findOne({
    where:{
      title:selSecQstn
    }
  });

  if( req.user.sec_ans === secAns && req.user.secQstnId === secQstn.id ) {
    await Developer.update({
      password_hash:genPswdHash(pswd)
    })
    req.logout();
    return  res.status(200).end();
  }else{
    return res.status(400).end();
  }


} );

const getDevTickets = catchAsync( async(req, res, next) =>{

  const userId = req.user.id;
  const tickets = await Ticket.findAll({
    raised_by_dev:userId,
    include:[ {model:Ttype}, { model:Tstatus }, { model:Tpriority }, {model:Project} ]
  })
  res.status(200).json(tickets);


});


module.exports={
  getDevInfo,
  resetPswd,
  getDevTickets
}