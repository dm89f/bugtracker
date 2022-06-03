const { catchAsync } = require("../utils/handleError")
const {Todo} = require('../models');

const getTodo = catchAsync( async(req, res, next)=>{

  const {todoId} = req.params;

  const todo = await Todo.findOne({
    where:{
      id:todoId
    },
    include:['developer']
  })

  res.json(todo)

} )

const editTodo = catchAsync( async(req, res, next)=>{
  
  const { title, description, type } = req.body;
  const {todoId} = req.params;


  const isUpTodo = await Todo.update(
    {
    title ,
    description,
    type,
  },{
    where:{
      id:todoId
    }
  }
  );

  if(!isUpTodo) res.status(400).json({"err_msg":"not able update todo"})

  const upTodo = await Todo.findOne({
    where:{
      id:todoId
    },
    include:['developer']

  })

  res.json(upTodo);

} )

const deleteTodo = catchAsync( async(req, res, next)=>{

  const {todoId} = req.params;

  const deleteTodo = await Todo.destroy({
    where:{
      id:todoId
    }
  })

  if(deleteTodo){
    res.json({
      "msg":"todo deleted successfully"
    })
  }


} )

module.exports={
  getTodo,
  editTodo,
  deleteTodo
}