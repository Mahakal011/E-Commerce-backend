// const {Sequelize} = require('sequelize');

// const sequelize = new Sequelize(
//     process.env.DB_NAME,
//     process.env.DB_USER,
//     process.env.DB_PASSWORD,
//     {
//     host: process.env.DB_HOST,
//     dialect: 'mysql',
//     dialectModule: require('mysql2') ,
        
//     dialect: 'sqlite',
//     storage: './database.sqlite'
// });

const mysql2 = require('mysql2');

const sequelize = new Sequelize({
  dialect: 'mysql',
  dialectModule: mysql2,  // Add this line
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  dialectOptions: {
    ssl: {
      rejectUnauthorized: true
    }
  }
});

module.exports = sequelize;
