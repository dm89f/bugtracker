const {db} = require('../config/dbConfig');
const {DataTypes} = db.Sequelize;

const Authorization = db.sequelize.define( 'authorization', {
    
  id:{
    type:DataTypes.UUID,
    primaryKey:true
  },
  title:{
    type:DataTypes.STRING,
    allowNull:false
  }

},
  {
    timestamps:false
  }
);

module.exports={ Authorization };