const express = require('express');
const router = express.Router();
const passport = require('passport');
const { registerDev } = require('../../controllers/authController');
const {
  isLoggedIn
} = require('../../middlewares/auth');


router.post('/register', registerDev);

router.post('/login', passport.authenticate('local', {
  failureRedirect: '/api_v1/auth/login_failed'
}), (req, res) => {

  res.statusCode = 200;
  res.statusMessage = "Login Sucessfull";
  res.end();
});

router.post('/logout', isLoggedIn, (req, res) => {

  req.logOut();
  res.statusCode = 200;
  res.statusMessage = "Logout Message";
  res.end();
})


router.get('/login_failed', (req, res) => {

  res.statusCode = 400;
  res.statusMessage = "Invalid Credentials";

});


module.exports.authRouter = router;