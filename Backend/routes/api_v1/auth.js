const express = require('express');
const router = express.Router();
const passport = require('passport');
const { 
  getTicketPriorities,
  getTicketTypes,
  getTicketStatuses,
  registerDev,
  getSecQstns,
  loginDev,
  checkDevLogin,
  logoutDev,
  loginFailed
} = require('../../controllers/authController');
const {
  isLoggedIn
} = require('../../middlewares/auth');
const {

} = require('../../controllers/authController')


router.post('/register', registerDev);
router.post( '/login', 
  passport.authenticate('local', {
  failureRedirect: '/api_v1/auth/login_failed'
  }),
  loginDev
);
router.get( '/sec_qstn',getSecQstns );
router.get('/ticket_priorities', getTicketPriorities);
router.get('/ticket_statuses', getTicketStatuses);
router.get('/ticket_types', getTicketTypes);
router.get( '/is_loggedin',isLoggedIn, checkDevLogin );
router.post('/logout', isLoggedIn, logoutDev);
router.get('/login_failed', loginFailed );


module.exports.authRouter = router;