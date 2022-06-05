const { catchAsync } = require("../utils/handleError");
const { Developer, DevTeam, Ticket, Project } = require('../models')

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

module.exports={
  getDevInfo
}