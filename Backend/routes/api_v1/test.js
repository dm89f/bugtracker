const express = require('express');
const router = express.Router();


router.get('/testDb', (req, res)=>{

  res.status(200).json({
    "msg":"we are ok"
  })

});

module.exports.testRouter = router;