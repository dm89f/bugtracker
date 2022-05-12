const bcrypt = require('bcrypt');
const saltRounds = 10;
const {Developer} = require('../models/DeveloperModel')
const customFields = {
  usernameField:'email',
  passwordField:'password'
}

const verifyCallback = (email, password, done)=>{
  
  ( async( email, password, done )=>{

      try{
        const dev = await Developer.findOne({
          where:{
            email:email
          }
        });

        if(dev){

          bcrypt.compare( password, dev.password_hash, function(err, result){

            if(err){
              throw err;
            }

            if(result){
             done( null, dev )
            }else{
              done(null, false);
            }
          } )

        }

      }catch(error){

        console.log("error in verify call back ");
        console.log(error)

      }

  } )( email, password, done )
  
  
}

const genPswdHash = ( pswd )=>{
  const hash = bcrypt.hashSync(pswd, saltRounds);
  return hash;
}

module.exports = {
  saltRounds,
  verifyCallback,
  customFields,
  genPswdHash
}