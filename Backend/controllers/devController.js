const { catchAsync } = require("../utils/handleError");
const { Developer, DevTeam, Ticket, Project, SecQstn } = require('../models')
const {genPswdHash} = require('../config/passportConfig')
const getDevInfo = catchAsync( async (req, res, next)=>{

  const tickets = await Ticket.findAll({
    where:{
      raised_by_dev:req.user.id
    }
  });

  const projects = await Project.findAll({
    where:{
      contributed_by:req.user.id
    }
  });

  const teams = await DevTeam.findAll({
    where:{
      developerId:req.user.id
    }
  })

  res.status(200).json({
    no_tickets_raised : tickets.length ,
    no_projects_contributed : projects.length ,
    no_team: teams.length
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



module.exports={
  getDevInfo,
  resetPswd
}