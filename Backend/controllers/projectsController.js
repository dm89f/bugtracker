const { Project, Developer } = require("../models");
const { catchAsync } = require("../utils/handleError");


const getProjects = catchAsync(async (req, res,next)=>{

  // const projects = await Project.findAll({
  //   where:{
      
  //   }
  // })

  res.status(500).end();

} )

module.exports = {
  getProjects
}