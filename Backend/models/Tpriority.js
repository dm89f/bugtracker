const {db} = require('../config/dbConfig');
const {DataTypes} = db.Sequelize;


const Tpriority = db.sequelize.define( 'tpriority', {

  id:{
    type:DataTypes.UUID,
    primaryKey:true
  },
  title:{
    type:DataTypes.STRING,
    allowNull:false
  }
},{
  timestamps:false
} )

module.exports = {  Tpriority};