const { SecQstn } = require("../models");
const {Authorization} = require('../models');
const { AppError } = require("./handleError");

const findSecQstn= async( sec_qstn )=>{

  const secQstn = await SecQstn.findOne(
   {
    where:{
      title:sec_qstn
    }
   }
  )
   
  return secQstn;

}

const isAdminUtil = async(reqAuth)=>{
  
  if(!reqAuth) throw new AppError("reqAuth null or undefined");

  const adminAuth = await Authorization.findOne({
    where:{
      title:'admin'
    }
  });

  return reqAuth === adminAuth.id;

}

const isSeniorDevUtil = async (reqAuth)=>{

  if(!reqAuth) throw new AppError("reqAuth null or undefined");


  const seniorDevAuth = await Authorization.findOne({
    where:{
      title:'senior dev'
    },
  })

  return reqAuth === seniorDevAuth.id;
}

function isArray ( obj ) { 
  return isObject(obj) && (obj instanceof Array);
}


function isObject ( obj ) {
  return obj && (typeof obj  === "object");
}

module.exports = {
  findSecQstn,
  isAdminUtil,
  isSeniorDevUtil,
  isArray,
  isObject
}