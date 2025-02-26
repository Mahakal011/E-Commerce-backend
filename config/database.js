// // const {Sequelize} = require('sequelize');

// // const sequelize = new Sequelize(
// //     process.env.DB_NAME,
// //     process.env.DB_USER,
// //     process.env.DB_PASSWORD,
// //     {
// //     host: process.env.DB_HOST,
// //     dialect: 'mysql',
// //     dialectModule: require('mysql2') ,
        
// //     dialect: 'sqlite',
// //     storage: './database.sqlite'
// // });

// const { Sequelize } = require('sequelize');
// // const mysql2 = require('mysql2');

// const sequelize = new Sequelize({
//   dialect: 'mysql',
//   // dialectModule: mysql2,  // Add this line
//   host: process.env.DB_HOST,
//   username: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   dialectOptions: {
//     ssl: {
//       rejectUnauthorized: true
//     }
//   }
// });

// module.exports = sequelize;

const { Sequelize } = require('sequelize');

let sequelize;

if (process.env.NODE_ENV === 'production') {
  // For production (Railway)
  const mysql2 = require('mysql2');
  sequelize = new Sequelize({
    dialect: 'mysql',
    dialectModule: mysql2,
    host: process.env.MYSQLHOST || process.env.DB_HOST,
    port: process.env.MYSQLPORT || process.env.DB_PORT,
    username: process.env.MYSQLUSER || process.env.DB_USER,
    password: process.env.MYSQLPASSWORD || process.env.DB_PASSWORD,
    database: process.env.MYSQLDATABASE || process.env.DB_NAME,
    logging: false
  });
} else {
  // For development
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite',
    logging: false
  });
}

module.exports = sequelize;
