const {db} = require('../config/dbConfig');
const {DataTypes} = db.Sequelize;
const { Developer } = require('./DeveloperModel');
const { Ticket } = require('./TicketModel');


const TicketMessage = db.sequelize.define( 'ticket_message', {

  id:{
    type:DataTypes.UUID,
    primaryKey:true
  },
  message:{
    type:DataTypes.TEXT,
    allowNull:false
  },
  developerId:{
    type:DataTypes.STRING,
    allowNull:false
  }
} );



Ticket.hasMany( TicketMessage, { onDelete:"CASCADE" }  );
TicketMessage.belongsTo( Ticket )

module.exports={
  TicketMessage
}