const isLoggedIn = (req, res, next)=>{

  if( req.isAuthenticated() ){
    next();
  }else{
    res.redirect('/notAuthorized');
  }

}

module.exports = {
  isLoggedIn
}