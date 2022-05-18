const express = require('express');
const router = express.Router();
const passport = require('passport');
const { getProjects, addProject } = require('../../controllers/projectsController');
const {isLoggedIn} = require('../../middlewares/auth');
const { Project } = require('../../models');

router.get( '/', isLoggedIn, getProjects);
router.post( '/', isLoggedIn, addProject )

module.exports.projectsRouter = router
  