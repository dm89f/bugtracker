const { SecQstn } = require("../models");

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

module.exports = {findSecQstn}