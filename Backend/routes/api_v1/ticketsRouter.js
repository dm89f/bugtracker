const express = require('express');
const router = express.Router({mergeParams:true});
const { isLoggedIn,reqAuthLevel2 } =require('../../middlewares/auth')

const {addTicket, getTickets} = require('../../controllers/ticketsController')


router.get('/', isLoggedIn,reqAuthLevel2, getTickets );
router.post('/',isLoggedIn,reqAuthLevel2,addTicket )


module.exports.ticketsRouter =router;