const express = require('express');
const router = express.Router({mergeParams:true});

const { 
  getProject, 
  getProjectTeam, addProjectTeam, 
  updateProject, updateProjectTeam, deleteProject 
} = require('../../controllers/ProjectController');

const {
  isLoggedIn,reqAuthLevel1, reqAuthLevel2, 
  reqAuthLevel3, reqAuthLevel4
} = require('../../middlewares/auth');


router.get('/:id', isLoggedIn, reqAuthLevel2, getProject  );
router.put('/:id', isLoggedIn, reqAuthLevel4, updateProject);
router.delete( '/:id', isLoggedIn, reqAuthLevel4, deleteProject );

router.get( '/:id/team',isLoggedIn, reqAuthLevel2,getProjectTeam );
router.post('/:id/team',isLoggedIn, reqAuthLevel1, addProjectTeam );
router.put( '/:id/team',isLoggedIn, reqAuthLevel4, updateProjectTeam );


module.exports.projectRouter = router