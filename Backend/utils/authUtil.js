const {Developer, Authorization} = require('../models');
const { AppError } = require('./handleError');

async function getDevInfo(devId){

  const dev = await Developer.findOne({
    where:{
      id:devId
    },
    include:Authorization
  })

  if(dev) return dev;
  else throw AppError("invalid user id");


}


module.exports = {
  getDevInfo
}