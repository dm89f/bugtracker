const express = require('express');
const router = express.Router();
const passport = require('passport');
const {isLoggedIn} = require('../../middlewares/auth');
const { Project } = require('../../models');


router.get( '/', isLoggedIn, async (req, res)=>{

  const projects = await Project.findAll();

  console.log(projects);

  res.json({
    "projects":JSON.stringify(projects)
  }).end();

}  );

module.exports.projectsRouter = router
