const express = require('express');
const router = express.Router({mergeParams:true});

const {reqAuthLevel2, reqAuthLevel4, isLoggedIn} = require('../../middlewares/auth')
const { 
  getTicket, updateTicket, deleteTicket, 
  addTicketTeam, updateTicketTeam, getTicketTeam, getTicketMessages  
} = require('../../controllers/ticketController')



router.get( '/:tid', isLoggedIn,reqAuthLevel2, getTicket );
router.put( '/:tid', isLoggedIn,reqAuthLevel2, updateTicket  );
router.delete( '/:tid', isLoggedIn,reqAuthLevel4, deleteTicket  );
  
router.get( '/:tid/team', isLoggedIn,reqAuthLevel2, getTicketTeam ); 
router.post( '/:tid/team',isLoggedIn,reqAuthLevel4, addTicketTeam  );
router.put( '/:tid/team',isLoggedIn,reqAuthLevel4, updateTicketTeam  );

//messages
router.get( '/:tid/messages', isLoggedIn, reqAuthLevel2, getTicketMessages );

module.exports.ticketRouter = router;
