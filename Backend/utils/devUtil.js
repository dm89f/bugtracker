const { DevTeam, Project, Ticket } = require('../models')

const getDevStats = async(devId)=>{

  const tickets = await Ticket.findAll({
    where:{
      raised_by_dev:devId
    }
  });

  const projects = await Project.findAll({
    where:{
      contributed_by:devId
    }
  });

  const teams = await DevTeam.findAll({
    where:{
      developerId:devId
    }
  })

  return {
    no_tickets_raised : tickets.length ,
    no_projects_contributed : projects.length ,
    no_team: teams.length
  }

}

module.exports={
  getDevStats
}