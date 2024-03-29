const {AppError, catchAsync} = require('../utils/handleError');
const {Op} = require('sequelize');
const uuid = require('uuid');
const { 
  Developer, SecQstn, 
  Tpriority, Tstatus, Ttype
} = require('../models');
const { genPswdHash } = require('../config/passportConfig');
const { findSecQstn } = require('../utils/utils');

const {getDevInfo} = require('../utils/authUtil')


const registerDev = catchAsync( async(req, res, next)=>{

  const {
    first_name,
    last_name,
    email,
    password,
    sec_qstn,
    sec_ans,
    phone_no

  } = req.body;
  
  const devExist = await Developer.findOne({
    where: {
      [Op.or]:[
        { email },
        { phone_no }
      ]
    }
  })

  if (devExist) {
    console.log(devExist)
    throw new AppError( "User Already Exist with that email or Phone No", 409 )

  } else {
    
    const secQstn = await findSecQstn(sec_qstn);

    if(!secQstn){
      throw new AppError("invalid security question", 401);
    }

    const newDev = await Developer.create({
      id: uuid.v1(),
      firstname:first_name,
      lastname:last_name,
      email,
      phone_no,
      password_hash: genPswdHash(password),
      secQstnId:secQstn.id,
      sec_ans: sec_ans,
      authorizationId:'1095b841-dc73-11ec-b88c-b9d3e621ba43' //senoir dev
    });

    return res.status(201).json(JSON.stringify(newDev));

  }
} );

const getSecQstns = catchAsync( async( req, res, next )=>{

  const sec_qstns = await SecQstn.findAll({});
  const qstns = []
  for( let qstn of sec_qstns ){
    qstns.push( { title:qstn.title } )
  }
  // console.log(qstns);
  res.status(200).json( JSON.stringify(qstns) );
})

const loginDev = catchAsync(async (req, res,next) => {

  const dev = await getDevInfo(req.user.id);

  res.status(200).json(dev); //send userInfo back for client USe
  
})

const logoutDev =  (req, res) => {
  req.logOut();
  res.status(200).json({
    "msg":"Logout Successfully"
  })
}

const loginFailed = (req, res) => {

  res.status(401).json({
    "error_msg":"Invalid Credentials"
  })

};

const checkDevLogin =(req, res)=>{
  res.status(200).json({"msg":"your logged in"});
}

const getTicketPriorities = catchAsync( async(req, res, next)=>{
  
  const tPriorities = await Tpriority.findAll({});
  res.status(201).json(tPriorities).end();

} )
const getTicketStatuses = catchAsync( async(req, res, next)=>{

  const tStatuses = await Tstatus.findAll({});
  res.status(201).json(tStatuses).end();

} )
const getTicketTypes = catchAsync( async(req, res, next)=>{

  const tTypes = await Ttype.findAll({});
  res.status(201).json(tTypes).end();

} )








module.exports = {
  registerDev,
  loginDev,
  getSecQstns,
  loginDev,
  checkDevLogin,
  logoutDev,
  loginFailed,
  getTicketPriorities,
  getTicketStatuses,
  getTicketTypes
}