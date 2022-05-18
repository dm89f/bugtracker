const {db} = require('../config/dbConfig');
const {DataTypes} = db.Sequelize;
const { Tpriority } =require('./Tpriority');
const { Tstatus } =require('./TstatusModel');
const { Ttype } =require('./TtypeModel');
const { Developer } = require('./DeveloperModel')
const { Project } = require('./ProjectModel');

const Ticket = db.sequelize.define( 'ticket',{
    
  id:{
    type:DataTypes.UUID,
    primaryKey:true
  },
  title:{
    type:DataTypes.STRING,
    allowNull:false
  },
  description:{
    type:DataTypes.TEXT,
    allowNull:false
  },
  time_est:{
    type:DataTypes.DECIMAL,
    allowNull:false
  },
  

} );

Project.hasMany( Ticket, { onDelete:'CASCADE' } );
Ticket.belongsTo(Project);

Developer.hasMany( Ticket, { foreignKey:'raised_by_dev' } );
Ticket.belongsTo(Developer, { foreignKey:'raised_by_dev' });

Tpriority.hasMany( Ticket );
Ticket.belongsTo(Tpriority);

Tstatus.hasMany( Ticket );
Ticket.belongsTo(Tstatus);
  
Ttype.hasMany( Ticket );
Ticket.belongsTo(Ttype);


module.exports = { Ticket };