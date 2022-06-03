const express = require('express');
const { isLoggedIn,isTodoAuthor } = require('../../middlewares/auth');
const router = express.Router({mergeParams:true});
const {
    getTodo, editTodo, deleteTodo
  
  } = require('../../controllers/TodoController')

router.get( '/', isLoggedIn, isTodoAuthor, getTodo )
router.put('/',isLoggedIn, isTodoAuthor, editTodo )
router.delete('/',isLoggedIn, isTodoAuthor, deleteTodo )

module.exports={
  todoRouter:router
}
