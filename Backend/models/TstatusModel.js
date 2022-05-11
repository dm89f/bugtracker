const {db} = require('../config/dbConfig');
const {DataTypes} = db.Sequelize;

const Tstatus = db.sequelize.define( 'tstatus', {
  id:{
    type:DataTypes.UUID,
    primaryKey:true
  },
  title:{
    type:DataTypes.STRING,
    allowNull:false
  },    

},{
  timestamps:false
} );

module.exports ={ Tstatus };