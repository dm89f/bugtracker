const express = require('express');
const router = express.Router({mergeParams:true});

const {reqAuthLevel2, reqAuthLevel4} = require('../../middlewares/auth')
const { getTicket, updateTicket, deleteTicket } = require('../../controllers/ticketController')



router.get( '/:tid', reqAuthLevel2, getTicket );
router.put( '/:tid', reqAuthLevel2, updateTicket  );
router.delete( '/:tid', reqAuthLevel4, deleteTicket  );;


module.exports.ticketRouter = router;
