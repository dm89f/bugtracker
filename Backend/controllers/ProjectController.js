const { catchAsync, AppError } = require("../utils/handleError");
const {Project, Ticket, Developer, DevTeam} = require('../models');
const { isAdminUtil, isSeniorDevUtil } =  require('../utils/utils')
const { Op, where } = require('sequelize')

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

const updateProject = catchAsync( async( req, res, next )=>{

  const testAdminAuth = await isAdminUtil(req.user.authorizationId);
  const testSeniorDevAuth = await isSeniorDevUtil(req.user.authorizationId );

  const { id } = req.params;
  
  if( testSeniorDevAuth ) {
    
    const getTeamInfo = await DevTeam.findOne({
      where:{
        [Op.and]:[
          { projectId:id },
          { developerId:req.user.id }
        ]
      }
    });


    if( !getTeamInfo || getTeamInfo.developerId !== req.user.id ){
      throw new AppError( "Only Admin and Senior dev in the Team can edit Project");
    }

  }else if( !testAdminAuth ) throw new AppError( "Only Admin and Senior dev in the Team can edit Project");


  const { title="", description="" } = req.body;
  
  if( title.length <5 || description.length<10 ){
    throw new AppError( 'project title needs minimum 5 charachters and  description needs minimum 10 charachters' );
  }
  
  const projUpdated = await Project.update( 
    {  title, description }, 
    {  where:{ id:id } } 
  );
  
  if(projUpdated){

    const updatedProj = await Project.findOne({
      id:id,
      include:Developer
    })

    return res.status(200).json(updatedProj);

  }else{
    
    return res.status( "update failed", 500 );

  }

});

const deleteProject = catchAsync( async( req, res, next )=>{

} );


//project team routes
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
  
});

const getProjectTeam = catchAsync( async (req, res, next)=>{

  const { id} = req.params;
  if( !id ) throw new AppError("Provide project id", 400);
  const team = await getProjectTeamUtil(id);  
  res.status(200).json(team)

} );

const updateProjectTeam = catchAsync( async( req, res, next )=>{ 

  const testAdminAuth = await isAdminUtil(req.user.authorizationId);
  const testSeniorDevAuth = await isSeniorDevUtil(req.user.authorizationId );

  const { id } = req.params;
  
  if( testSeniorDevAuth ) {
    
    const getTeamInfo = await DevTeam.findOne({
      where:{
        [Op.and]:[
          { projectId:id },
          { developerId:req.user.id }
        ]
      }
    });


    if( !getTeamInfo || getTeamInfo.developerId !== req.user.id ){
      throw new AppError( "Only Admin and Senior dev in the Team can update Team members");
    }

  }else if( !testAdminAuth ) throw new AppError( "Only Admin and Senior dev in the Team can update Team members");

  const { assignedDevs=[] } = req.body;

  if( !assignedDevs || assignedDevs.length == 0 ) throw new AppError( "Project Team must contain atleast one Dev" );

  await DevTeam.destroy({
    where:{
      projectId:id
    }
  });

  for( let teamDev of  assignedDevs ){

    await DevTeam.create( { projectId:id, developerId:teamDev } );

  }

  const projTeam = await getProjectTeamUtil(id);
  
  res.json(200).json(projTeam);
  
  
} )


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
  updateProject,
  addProjectTeam,
  getProjectTeam,
  updateProjectTeam
}