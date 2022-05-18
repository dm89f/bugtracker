const express = require('express');
const router = express.Router();
const { reqAuthLevel1, reqAuthLevel2, reqAuthLevel3, reqAuthLevel4 ,reqAuthLevel5 } = require('../../middlewares/auth')

router.get('/isloggedin', reqAuthLevel1, (req, res)=>{
  res.json("level 1 auth passed");
});

router.get('/project/:id', reqAuthLevel2, (req, res)=>{
  res.json("level 2 auth passed");
});

router.get( '/project/:id/l3', reqAuthLevel3, (req, res)=>{
  res.json("level 3 auth passed");
} )

router.get( '/project/:id/l4', reqAuthLevel4, (req, res)=>{
  res.json("level 4 auth passed");
} )

router.get( '/project/:id/l5', reqAuthLevel5, (req, res)=>{
  res.json("level 5 auth passed");
} )

module.exports.testRouter = router;