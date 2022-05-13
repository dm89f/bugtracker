const express = require('express');
const router = express.Router();
const passport = require('passport');
const {isLoggedIn} = require('../../middlewares/auth');
const { Project } = require('../../models');


router.get( '/', isLoggedIn, async (req, res)=>{

  res.status(200).json({
    "msg":"inside project Router"
  })

}  );

module.exports.projectsRouter = router
