const { catchAsync } = require("../utils/handleError")
const {Todo} = require('../models')
const uuid = require('uuid')

const getTodos = catchAsync( async(req, res, next)=>{

  const devId = req.user.id;

  const myTodos = await Todo.findAll({
    where:{
      devId
    },
    include:['developer']
  })

  res.json(myTodos)

} )

const addTodo = catchAsync( async(req, res, next)=>{

  const { title, description, type } = req.body;
  const devId = req.user.id; 

  const newTodo = await Todo.create({
    id: uuid.v1(),
    title ,
    description,
    type,
    devId
  });

  res.json(newTodo);
} )


module.exports={
  addTodo,
  getTodos  
}