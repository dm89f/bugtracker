const { catchAsync, AppError } = require("../utils/handleError");
const {Project, Ticket, Developer, DevTeam} = require('../models');

const getProject = catchAsync( async(req, res, next)=>{
  
  const {id} = req.params;
  if( !id ) throw new AppError("Provide project id", 400);

  const project =await Project.findOne({
    where:{
      id
    },
    include:[
      {
        model:Developer
      },
      {
        model:Ticket
      }
    ]
  })


  res.status(200).json(project);

})

const getProjectTeam = catchAsync( async (req, res, next)=>{

  const {id} = req.params;
  if( !id ) throw new AppError("Provide project id", 400);

  const projectTeam = await DevTeam.findAll(
    {
      where:{
        projectId:id
      },
      
    }
  )
  
  let team = []

  for( let pinfo of projectTeam ){
    let dev = await Developer.findOne({
      where:{
        id:pinfo.developerId
      }
    })

    const {id, firstname, lastname, email, phone_no} = dev
    team.push( {id, firstname, lastname, email, phone_no} );
  }

  res.status(200).json(team)

} );

const editProject = catchAsync( async( req, res, next )=>{

  res.status(200).json("edit project")

});

module.exports = {
  getProject,
  getProjectTeam,
  editProject
}