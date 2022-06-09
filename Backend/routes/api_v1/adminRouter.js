const express = require('express');
const { getDevs, updateDevRole, getDevInfo } = require('../../controllers/adminController');
const { isLoggedIn , reqAuthLevel5} = require('../../middlewares/auth');
const router = express.Router();


router.get( '/devs',  isLoggedIn, reqAuthLevel5, getDevs );
router.get('/devs/:devId', isLoggedIn, reqAuthLevel5,  getDevInfo );
router.put('/devs/:devId',  isLoggedIn, reqAuthLevel5, updateDevRole )

module.exports = {
  adminRouter:router
}