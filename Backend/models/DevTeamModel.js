const {db} = require('../config/dbConfig');
const {DataTypes} = db.Sequelize;
const {Developer} = require('./DeveloperModel');
const {Project} = require('./ProjectModel');

const DevTeam = db.sequelize.define( 'dev_team',{

},{
  timestamps:false
} )


Developer.belongsToMany(Project, { through:'dev_team' });
Project.belongsToMany(Developer, { through:'dev_team', onDelete:'CASCADE' });

module.exports = { DevTeam };