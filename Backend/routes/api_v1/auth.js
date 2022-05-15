const express = require('express');
const router = express.Router();
const passport = require('passport');
const { 
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


router.post('/register', registerDev);
router.post( '/login', 
  passport.authenticate('local', {
  failureRedirect: '/api_v1/auth/login_failed'
  }),
  loginDev
);
router.get( '/sec_qstn',getSecQstns );
router.get( '/is_loggedin',isLoggedIn, checkDevLogin );
router.post('/logout', isLoggedIn, logoutDev);
router.get('/login_failed', loginFailed );


module.exports.authRouter = router;