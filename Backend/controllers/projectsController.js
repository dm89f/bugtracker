const { Project, Developer, DevTeam } = require("../models");
const { catchAsync, AppError } = require("../utils/handleError");
const { isAdminUtil, isSeniorDevUtil } = require("../utils/utils");
const uuid = require('uuid');
//not done
const getProjects = catchAsync(async (req, res,next)=>{

  const devProjectIds = await DevTeam.findAll({
    where:{
      developerId:req.user.id
    }
  });

  if( devProjectIds === [] ) throw new AppError( "developer is not part of any project", 404 );

  let devProjects = devProjectIds.map( async (dev)=>{
      
    const project =await Project.findOne( {
        include:Developer,
        where:{
          id:dev.projectId
        } 
    } )
    
    return { 
            projectId:project.id,
            title:project.title, 
            description:project.description, 
            contributed_by:`${project.developer.firstname} ${project.lastname}`
          };

  } )
  console.log( "projects : ", devProjects);
  res.status(500).json(devProjects);


} );

//included project contributor to dev team
const addProject = catchAsync( async(req, res, next)=>{

  const testAdminAuth = await isAdminUtil(req.user.authorizationId);
  const testSeniorDevAuth = await isSeniorDevUtil(req.user.authorizationId );

  if( !testAdminAuth || !testSeniorDevAuth ) throw new AppError( "Only Admin and Senior Dev can add Projects" );

  const { title, description, assignedDevs } = req.body;
  const isProjectExist = await Project.findOne( { title } );

  if(isProjectExist) throw new AppError( "Project with that title alreaady exist", 400 );

  const project = await Project.create( { id: uuid.v1(),title ,description, contributed_by:req.user.id} );
  if( !assignedDevs || assignedDevs === [] ){
    throw new AppError("Empty assigned devs error", 400);
  }

  await DevTeam.create( { developerId:req.user.id, projectId:project.id } );
  for( let asgnDev of assignedDevs ){
    await DevTeam.create( { developerId:asgnDev, projectId:project.id } );
  }

  res.status(201).json({
    "msg":"project added successfully"
  })

} );

const getAllOpenDevs = catchAsync( async(req, res, next)=>{



} );


module.exports = {
  getProjects,
  addProject,
  getAllOpenDevs
}