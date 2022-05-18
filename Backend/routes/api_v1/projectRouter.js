const express = require('express');
const { getProject, getProjectTeam } = require('../../controllers/ProjectController');
const router = express.Router();
const {isLoggedIn} = require('../../middlewares/auth')

router.get('/:id', isLoggedIn, getProject  );

router.get( '/:id/team', getProjectTeam );

router.put('/:id',(req, res)=>{
    
} )

router.delete( '/:id', (req, res)=>{

} )

module.exports.projectRouter = router