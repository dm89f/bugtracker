const {catchAsync, AppError} = require('../utils/handleError')
const {Op} = require('sequelize')
const isLoggedIn = (req, res, next)=>{

  if( req.isAuthenticated() ){
    next();
  }else{
    res.redirect('/notAuthorized');
  }

}


const { isAdmin, isJuniorDev, isSeniorDev, DevTeam, Project } = require('../models');



const reqAuthLevel1 = catchAsync( async ( req, res, next )=>{
 
  const seniorDevAuth = await isSeniorDev(req.user.authorizationId);
  const adminAuth = await isAdmin(req.user.authorizationId);

  if( seniorDevAuth || adminAuth  ) next();
  else{
    throw new AppError( 'only senior dev and admin has Access', 401 );
  }

  
});

const reqAuthLevel2 = catchAsync( async( req, res, next )=>{

  const { id  } = req.params;
  const userId = req.userId;

  const adminAuth = await isAdmin(req.user.id);
  const teamMem = await isTeamMember(userId, id)

  if( teamMem || adminAuth ) next();
  else throw new AppError(  'only senior Member and admin has Access', 401,  )  


} );

const reqAuthLevel3 = catchAsync( async( req, res, next )=>{
  
  const { id  } = req.params;
  const userId = req.user.id;
  const userAuth = req.user.authorizationId;

  const adminAuth = await isAdmin(req.user.id);
  const teamMem = await isTeamMember(userId, id);
  const senDev = await isSeniorDev(userAuth);


  if( teamMem && senDev || adminAuth) next();
  else throw new AppError(  'only senior teamMember and admin has Access', 401 )  


} );


const reqAuthLevel4 = catchAsync( async( req, res, next )=>{

  const { id  } = req.params;
  const userId = req.user.id;
  const userAuth = req.user.authorizationId;

  const adminAuth = await isAdmin(req.user.id);
  const projCont = await isProjectContributer( userId, id );
  
  if( adminAuth || ( projCont ) ) next();
  else throw new AppError( "only project contributor and admin has access", 401 );


} );

const reqAuthLevel5 = catchAsync( async( req, res, next )=>{

  const userId = req.user.id;
  const adminAuth = await isAdmin(req.user.id);

  if(adminAuth) next();
  else throw new AppError("only admin has access");

} );


async function isTeamMember(userId, projectId){

  const teamInfo = await DevTeam.findOne({
    where:{
      [Op.and]:[
        { developerId:userId },
        { projectId }
      ]
    }
  })

  if(teamInfo) return true;
  else return false;

}

async function isProjectContributer( userId, projectId ){

  const project = await Project.findOne({
    where:{
      id:projectId
    }
  })

  return userId === project.contributed_by;

}



module.exports = {
  isLoggedIn,
  reqAuthLevel1,
  reqAuthLevel2,
  reqAuthLevel3,
  reqAuthLevel4,
  reqAuthLevel5

}