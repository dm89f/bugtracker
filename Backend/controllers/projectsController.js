const { Project, Developer } = require("../models");
const { catchAsync, AppError } = require("../utils/handleError");
const { isAdminUtil, isSeniorDevUtil } = require("../utils/utils");


const getProjects = catchAsync(async (req, res,next)=>{

  // const projects = await Project.findAll({
  //   where:{
      
  //   }
  // })
  console.log(req.user) 

  const testSeniorDevAuth = await isSeniorDevUtil(req.user.authorizationId);
  if(!testSeniorDevAuth) throw new AppError( { "msg":"not senior dev" } );


  res.status(500).json({ "msg":"senior dev Auth successfull" });

} );

const addProject = catchAsync( async(req, res, next)=>{
  

} )

const getAllOpenDevs = catchAsync( async(req, res, next)=>{



} )


module.exports = {
  getProjects,
  addProject,
  getAllOpenDevs
}