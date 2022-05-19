const express = require('express');
const router = express.Router({mergeParams:true});

const {reqAuthLevel2, reqAuthLevel4, isLoggedIn} = require('../../middlewares/auth')
const { getTicket, updateTicket, deleteTicket } = require('../../controllers/ticketController')



router.get( '/:tid', isLoggedIn,reqAuthLevel2, getTicket );
router.put( '/:tid', isLoggedIn,reqAuthLevel2, updateTicket  );
router.delete( '/:tid', isLoggedIn,reqAuthLevel4, deleteTicket  );;


module.exports.ticketRouter = router;
