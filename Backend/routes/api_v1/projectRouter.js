const express = require('express');
const { getProject, getProjectTeam, addProjectTeam, updateProject, updateProjectTeam } = require('../../controllers/ProjectController');
const router = express.Router();
const {isLoggedIn} = require('../../middlewares/auth')

router.get('/:id', isLoggedIn, getProject  );

router.put('/:id', isLoggedIn, updateProject)

router.delete( '/:id', (req, res)=>{

} )

router.get( '/:id/team', getProjectTeam );
router.post('/:id/team', addProjectTeam );
router.put( '/:id/team', updateProjectTeam );


module.exports.projectRouter = router