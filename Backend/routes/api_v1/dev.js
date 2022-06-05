const express = require('express');
const router = express.Router();
const {isLoggedIn} = require('../../middlewares/auth')
const {getDevInfo} = require('../../controllers/devController');


router.get('/devInfo', isLoggedIn, getDevInfo  );


module.exports={
  devRouter:router
}