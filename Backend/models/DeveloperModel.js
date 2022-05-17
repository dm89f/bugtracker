const {db} = require('../config/dbConfig');
const {DataTypes} = db.Sequelize;
const {Authorization} = require('./AuthorizationModel');
const { SecQstn } = require('./SecQstnModel');
const Developer = db.sequelize.define( 'developer',{
    
  id:{
    type:DataTypes.UUID,
    primaryKey:true
  },
  firstname:{
    type:DataTypes.STRING,
    allowNull:false
  },
  lastname:{
    type:DataTypes.STRING,
    allowNull:false
  },
  email:{
    type:DataTypes.STRING,
    allowNull:false
  },
  isAvailable:{
    type:DataTypes.BOOLEAN,
    allowNull:false,
    defaultValue:true
  },
  phone_no:{
    type:DataTypes.STRING,
    allowNull:false
  },
  sec_ans:{
    type:DataTypes.STRING,
    allowNull:false
  },
  password_hash:{
    type:DataTypes.STRING,
    allowNull:false

  },
} );

Authorization.hasMany( Developer );
Developer.belongsTo(Authorization);

SecQstn.hasMany(Developer);
Developer.belongsTo(SecQstn);
module.exports = { Developer};