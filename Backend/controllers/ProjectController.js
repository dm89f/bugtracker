const { catchAsync, AppError } = require("../utils/handleError");
const {Project, Ticket, Developer, DevTeam} = require('../models');
const { isAdminUtil, isSeniorDevUtil } =  require('../utils/utils')

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

const editProject = catchAsync( async( req, res, next )=>{

  res.status(200).json("edit project")

});


const addProjectTeam = catchAsync( async( req, res, next )=>{
  
  const testAdminAuth = await isAdminUtil(req.user.authorizationId);
  const testSeniorDevAuth = await isSeniorDevUtil(req.user.authorizationId );

  const { id } = req.params;
  const { assignedDevs } = req.body;

  if( !testAdminAuth && !testSeniorDevAuth ) throw new AppError( "Only Admin and Senior Dev can make Project Team" );

  if( !assignedDevs || assignedDevs === [] ){
    throw new AppError("Empty assigned devs error", 400);
  }

  for( let asgnDev of assignedDevs ){
    await DevTeam.create( { developerId:asgnDev, projectId:id } );
  }

  const projectTeam = await getProjectTeamUtil(id); 

  res.status(201).json(projectTeam);
  
})


const getProjectTeam = catchAsync( async (req, res, next)=>{

  const { id} = req.params;
  if( !id ) throw new AppError("Provide project id", 400);
  const team = await getProjectTeamUtil(id);  
  res.status(200).json(team)

} );

const getProjectTeamUtil = async (projectId)=>{

  const projectTeam = await DevTeam.findAll(
    {
      where:{
        projectId
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

  return team;

}



module.exports = {
  getProject,
  editProject,
  addProjectTeam,
  getProjectTeam,
}