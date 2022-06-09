const { Developer, Authorization } = require("../models");
const { catchAsync } = require("../utils/handleError");
const { getDevStats } = require('../utils/devUtil')

const getDevs = catchAsync( async( req, res, next )=>{

  const devs = await Developer.findAll({
    include:Authorization
  })
  res.status(201).json(devs);  

} );

const getDevInfo = catchAsync(async( req, res, next )=>{

  const { devId } = req.params;
  const { no_tickets_raised,
    no_projects_contributed,
    no_team } = await getDevStats(devId);

  res.status(200).json({ 
    no_tickets_raised,
    no_projects_contributed,
    no_team
  });

} )

const updateDevRole = catchAsync( async(req, res, next )=>{ 

  const {devId} = req.params;
  const {title} = req.body;
  
  const auth = await Authorization.findOne({
    where:{
      title:title
    }
  });

  const updDev = await Developer.update({
    authorizationId:auth.id
  },
    {
      where:{
        id:devId
      }
    }
  );

  if( updDev )  res.status(201).json(updDev);
  else res.status(400).json(updDev);


} );



module.exports = {
  getDevs,
  updateDevRole,
  getDevInfo
}