const {db} = require('../config/dbConfig');
const {DataTypes} = db.Sequelize;

const {Developer} = require('./DeveloperModel');
const {Ticket} = require('./TicketModel');

const TicketTeam = db.sequelize.define( 'ticket_team',{},{

},{
  timestamps:false
} );

Developer.belongsToMany( Ticket, { through:'ticket_team' }  );
Ticket.belongsToMany(Developer, { through:'ticket_team', onDelete:'CASCADE' });

module.exports = { TicketTeam };
