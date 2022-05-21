const { Project, Developer, DevTeam } = require("../models");
const { catchAsync, AppError } = require("../utils/handleError");
const { isAdminUtil, isSeniorDevUtil } = require("../utils/utils");
const uuid = require('uuid');


//get all projects that dev part of
const getProjects = catchAsync(async (req, res,next)=>{
  
  const devProjectIds = await DevTeam.findAll({
    where:{
      developerId:req.user.id
    }
  });


  if( devProjectIds.length === 0 ){
    return res.status(200).json([]);
  }

  let devProjects = [];

  for(let dev of devProjectIds ){
    const project =await Project.findOne( {
      include:Developer,
      where:{
        id:dev.projectId
      } 
    })
  
    devProjects.push({ 
      projectId:project.id,
      title:project.title, 
      description:project.description, 
      contributed_by:`${project.developer.firstname} ${project.developer.lastname}`
    });
  }


  console.log( "projects : ", devProjectIds);
  res.status(200).json(devProjects);


} );

const addProject = catchAsync( async(req, res, next)=>{ 

  const { title, description} = req.body;

  const isProjectExist = await Project.findOne( {
    where:{
      title:title
    }
  } );
  if(isProjectExist) throw new AppError( "Project with that title alreaady exist", 400 );

  const newProject = await Project.create( { id: uuid.v1(),title ,description, contributed_by:req.user.id} );
  const project = await Project.findOne({
    where:{
      id:newProject.id
    },
    include:Developer
  });

  console.log(project);

  res.status(201).json(project)

} );

//return devs whoose isAvailable set to true
const getAllOpenDevs = catchAsync( async(req, res, next)=>{

  const testAdminAuth = await isAdminUtil(req.user.authorizationId);
  const testSeniorDevAuth = await isSeniorDevUtil(req.user.authorizationId );

  if( !testAdminAuth && !testSeniorDevAuth ) throw new AppError( "Only Admin and Senior Dev can have access", 401 );

  const developers = await Developer.findAll({
    where:{
      isAvailable:true
    }
  })

  let openDevs = []

  for( let openDev of developers ){
    openDevs.push( { fullname:`${openDev.firstname} ${openDev.lastname}`, devId: openDev.id } );
  }

  res.status(200).json(openDevs);  

} );

module.exports = {
  getProjects,
  addProject,
  getAllOpenDevs,  
}