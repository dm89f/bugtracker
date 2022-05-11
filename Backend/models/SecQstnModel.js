const {db} = require('../config/dbConfig');
const {DataTypes} = db.Sequelize;

const SecQstn = db.sequelize.define( 'sec_qstn',{
  id:{
    type:DataTypes.UUID,
    primaryKey:true
  },
  title:{
    type:DataTypes.STRING,
    allowNull:false,
  }
},{
  timestamps:false
});

module.exports = { SecQstn };