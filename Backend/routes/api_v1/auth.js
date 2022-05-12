const express = require('express');
const router = express.Router();
const {Developer} = require('../../models/DeveloperModel')
const uuid = require('uuid');
const passport = require('passport');

router.post('/register', async (req, res)=>{

  const { 
    firstname:first_name,
    lastname:last_name,
    email,
    password,
    sec_qstn,
    sec_ans,
    phone_no

  } = req.body;

  const devExist = await Developer.findOne( {
    where:{
      email:email
    }
  } )

  if(devExist){
  
    res.send('dev Exist');
  
  }else{
    
    const newDev = new Developer.create({

      id:uuid.v1(),
      firstname,
      lastname,
      email,
      phone_no,
      

    })

  }


  res.json(req.body).end();

});

router.post('/login', passport.authenticate( 'local', {
  failureRedirect:'/api_v1/auth/login_failed'
} ), (req, res)=>{

  res.json({
    "msg":"Logged in"
  })

} );

router.get('/login_failed', (req, res)=>{

    res.json({
      "msg":"Invalid Credenntials"
    }).end();

});


module.exports.authRouter=router; 