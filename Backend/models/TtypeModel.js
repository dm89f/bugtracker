const {db} = require('../config/dbConfig');
const {DataTypes} = db.Sequelize;


const Ttype = db.sequelize.define( 'ttype', {
    
  id:{
    type:DataTypes.UUID,
    primaryKey:true
  },
  title:{
    type:DataTypes.STRING,
    allowNull:false
  }
},{ timestamps:false } )

module.exports ={ Ttype };
