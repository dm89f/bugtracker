const { catchAsync } = require("../utils/handleError");
const { Developer, DevTeam, Ticket, Project, SecQstn, Tpriority, Tstatus, Ttype  } = require('../models')
const {genPswdHash} = require('../config/passportConfig');
const { getDevStats } = require('../utils/devUtil');
const { Op } = require("sequelize");


const getDevInfo = catchAsync( async (req, res, next)=>{

  const {
    no_tickets_raised , 
    no_projects_contributed, no_team } = await getDevStats(req.user.id);

  res.status(200).json({ 
    no_tickets_raised , no_projects_contributed , no_team
  })

} )

const resetPswd = catchAsync( async(req, res, next)=>{

  const { selSecQstn, secAns, pswd } = req.body;

  const secQstn = await SecQstn.findOne({
    where:{
      title:selSecQstn
    }
  });

  if( secQstn && req.user.sec_ans === secAns && req.user.secQstnId === secQstn.id ) {
   
    await Developer.update({
      password_hash:genPswdHash(pswd)
    },{
      where:{
        id:req.user.id
      }
    })
    return  res.status(201).end();
  
  }else{

    return res.status(400).end();
  
  }


} );

const getDevTickets = catchAsync( async(req, res, next) =>{


  const userId = req.user.id;
  const tickets = await Ticket.findAll({
    raised_by_dev:userId,
    include:[ {model:Ttype}, { model:Tstatus }, { model:Tpriority }, {model:Project} ]
  })
  res.status(200).json(tickets);


});

const getDevTicketsStats = catchAsync( async( req, res, next)=>{

  const tstatuses = await Tstatus.findAll({});
  const tpriorities = await Tpriority.findAll({});
  const ttypes = await Ttype.findAll({});

  const cntTstatuses = {};
  const cntTpriorities = {};
  const cntTtypes = {};

  for ( let item of tstatuses ){

    let tickets = await Ticket.findAll({
      where:{
        [Op.and]:[
          { raised_by_dev:req.user.id },
          { tstatusId:item.id }
        ]
      }
    })
    cntTstatuses[item.id] = {size:tickets.length, title:item.title};
  }

  for ( let item of tpriorities ){

    let tickets = await Ticket.findAll({
      where:{
        [Op.and]:[
          { raised_by_dev:req.user.id },
          { tpriorityId:item.id }
        ]
      }
    })
    cntTpriorities[item.id] = {size:tickets.length, title:item.title};
  }
  
  for ( let item of ttypes ){

    let tickets = await Ticket.findAll({
      where:{
        [Op.and]:[
          { raised_by_dev:req.user.id },
          { ttypeId:item.id }
        ]
      }
    })
    cntTtypes[item.id] = {size:tickets.length, title:item.title};
  }


  res.status(200).json({
    cntTstatuses,
    cntTpriorities,
    cntTtypes
  })

} );

module.exports={
  getDevInfo,
  resetPswd,
  getDevTickets,
  getDevTicketsStats
}