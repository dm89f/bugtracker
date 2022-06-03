const {db} = require('../config/dbConfig');
const {DataTypes} = db.Sequelize;
const {Developer} = require('./DeveloperModel')

const Todo = db.sequelize.define( 'todo', {

  id:{
    type:DataTypes.UUID,
    primaryKey:true
  },
  title:{
    type:DataTypes.STRING,
    unique:true,
    allowNull:false
  },
  description:{
    type:DataTypes.TEXT,
    allowNull:false
  },
  type:{
    type:DataTypes.STRING,
    validate:{
      isIn: [[ "open", "finished" ]],      
    },
    allowNull:false

  }
  

} );



Developer.hasMany( Todo, { foreignKey:'devId',}, {  } );
Todo.belongsTo(Developer, { foreignKey:'devId' });

module.exports={
  Todo
}