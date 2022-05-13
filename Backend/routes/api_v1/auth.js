const express = require('express');
const router = express.Router();
const passport = require('passport');
const { 
  registerDev,
  getSecQstns,
  loginDev
} = require('../../controllers/authController');
const {
  isLoggedIn
} = require('../../middlewares/auth');


router.post('/register', registerDev);
router.get( '/sec_qstn',getSecQstns );


router.post( '/login', 
  passport.authenticate('local', {
  failureRedirect: '/api_v1/auth/login_failed'
  }),
  loginDev
);

router.post('/logout', isLoggedIn, (req, res) => {

  req.logOut();
  res.statusCode = 200;
  res.statusMessage = "Logout Message";
  res.end();
})


router.get('/login_failed', (req, res) => {

  res.status(400).json({
    "msg":"Invalid Credentials"
  })

});


module.exports.authRouter = router;