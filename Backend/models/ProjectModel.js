const {db} = require('../config/dbConfig');
const {DataTypes} = db.Sequelize;
const {Developer} = require('./DeveloperModel')

const Project = db.sequelize.define( 'project', {

  id:{
    type:DataTypes.UUID,
    primaryKey:true,
  },  
  title:{
    type:DataTypes.STRING,
    allowNull:false
  },

} )

Developer.hasMany(Project, { foreignKey:'contributed_by' });
Project.belongsTo(Developer, { foreignKey:'contributed_by' });


module.exports =  {Project};
