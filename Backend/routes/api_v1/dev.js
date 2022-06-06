const express = require('express');
const router = express.Router();
const {isLoggedIn} = require('../../middlewares/auth')
const {getDevInfo, resetPswd } = require('../../controllers/devController');


router.get('/devInfo', isLoggedIn, getDevInfo  );
router.put( '/reset_pswd', isLoggedIn, resetPswd  );

module.exports={
  devRouter:router
}