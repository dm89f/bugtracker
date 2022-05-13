const {AppError, catchAsync} = require('../utils/handleError');
const {Op} = require('sequelize');
const uuid = require('uuid');
const { Developer, SecQstn } = require('../models');
const { genPswdHash } = require('../config/passportConfig');
const { findSecQstn } = require('../utils/utils');

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
      authorizationId:'b3ea2db1-d1b4-11ec-ac37-f5176ea110d2'
    });

    return res.status(201).json(JSON.stringify(newDev));

  }
} );

const loginDev = catchAsync(   )

module.exports = {
  registerDev,
  loginDev
}