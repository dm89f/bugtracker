class AppError extends Error{

  constructor( message, status ){
    super();
    this.message = message;
    this.status =status;
  }
  

}

const catchAsync = (fn)=>{

  return function(req, res, next){
    fn(req, res, next).catch(err =>{ next(err) });
  }

}

module.exports = {
  AppError,
  catchAsync
}