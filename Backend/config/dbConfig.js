require('dotenv').config();
const { Sequelize, DataTypes, DATE } = require('sequelize');
const sequelize = new Sequelize( 
  process.env.DB,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host:'localhost',
    dialect:'mariadb'
  }
);


async function dbConnect(){

  try{

    await sequelize.authenticate();
    console.log("DB Connection has been established");
  
  }catch(error){
  
    console.log("unable to connect to db", error)
  
  }

}

dbConnect();

module.exports.db = { sequelize, Sequelize }