const {catchAsync} = require('../utils/handleError')

const isLoggedIn = (req, res, next)=>{

  if( req.isAuthenticated() ){
    next();
  }else{
    res.redirect('/notAuthorized');
  }

}
const {AUTH} = require('../models');


const test = async()=>{

  console.log(AUTH.ADMINDEV);

}

test();




const reqAuthLevel1 = catchAsync( async( req, res, next )=>{

} );

const reqAuthLevel2 = catchAsync( async( req, res, next )=>{


} );
const reqAuthLevel3 = catchAsync( async( req, res, next )=>{


} );
const reqAuthLevel4 = catchAsync( async( req, res, next )=>{


} );
const reqAuthLevel5 = catchAsync( async( req, res, next )=>{


} );
const reqAuthLevel6 = catchAsync( async( req, res, next )=>{


} );



module.exports = {
  isLoggedIn
}