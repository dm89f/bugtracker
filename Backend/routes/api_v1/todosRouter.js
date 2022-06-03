const express = require('express');
const { isLoggedIn } = require('../../middlewares/auth');
const router = express.Router({mergeParams:true});
const { addTodo, getTodos } = require('../../controllers/TodosController')

router.get('/',isLoggedIn, getTodos )

router.post( '/', isLoggedIn, addTodo )


module.exports={
  todosRouter:router
}