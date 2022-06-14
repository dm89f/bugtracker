const express = require('express');
const router = express.Router();
const {isLoggedIn} = require('../../middlewares/auth')
const {getDevInfo, resetPswd, getDevTickets,getDevTicketsStats } = require('../../controllers/devController');


router.get('/devInfo', isLoggedIn, getDevInfo  );
router.put( '/reset_pswd', isLoggedIn, resetPswd  );
router.get( '/tickets', isLoggedIn, getDevTickets );
router.get( '/ticket_stats', isLoggedIn, getDevTicketsStats )
module.exports={
  
  devRouter:router

}