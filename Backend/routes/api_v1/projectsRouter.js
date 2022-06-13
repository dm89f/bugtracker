const express = require('express');
const router = express.Router({mergeParams:true});
const passport = require('passport');
const { getProjects, addProject, 
  getAllOpenDevs } = require('../../controllers/projectsController');
const { Project } = require('../../models');

const { isLoggedIn ,reqAuthLevel1, reqAuthLevel2} = require('../../middlewares/auth')


router.get( '/', isLoggedIn, getProjects);
router.post( '/', isLoggedIn,reqAuthLevel1, addProject )
router.get( '/devs', isLoggedIn,reqAuthLevel1, getAllOpenDevs );

module.exports.projectsRouter = router
  