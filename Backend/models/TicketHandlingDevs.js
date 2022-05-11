const {db} = require('../config/dbConfig');
const {DataTypes} = db.Sequelize;
const {Developer} = require('./DeveloperModel');
const { Ticket } = require('./TicketModel')

const TicketAssignedDev = db.sequelize.define( 'ticket_assigned_dev', )

Developer.belongsToMany(Ticket, { through:'ticket_assigned_dev' });
Ticket.belongsToMany(Developer, { through:'ticket_assigned_dev' })


module.exports = { TicketAssignedDev }