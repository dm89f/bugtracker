const express = require('express');
const router = express.Router({mergeParams:true});
const { isLoggedIn,reqAuthLevel2 } =require('../../middlewares/auth')

const {addTicket, getTickets} = require('../../controllers/ticketsController')


router.get('/', reqAuthLevel2, getTickets );
router.post('/',reqAuthLevel2,addTicket )


module.exports.ticketsRouter =router;
