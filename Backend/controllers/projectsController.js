const { Project } = require("../models");
const { catchAsync } = require("../utils/handleError");


const getProjects = catchAsync(async (req, res,next)=>{

  const projects = await Project.findAll({});
  res.status(200).json(JSON.stringify(projects));

} )

module.exports = {
  getProjects
}