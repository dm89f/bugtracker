const express = require('express');
const router = express.Router();
const passport = require('passport');
const { getProjects } = require('../../controllers/projectsController');
const {isLoggedIn} = require('../../middlewares/auth');
const { Project } = require('../../models');

router.get( '/', isLoggedIn, getProjects);

module.exports.projectsRouter = router
  