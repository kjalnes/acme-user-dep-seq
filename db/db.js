// setup the sequelize instance
const Sequelize = require('sequelize');

// connection to our postgres db
const sequelDb = new Sequelize(process.env.DATABASE_URL);

// export sequelDb object so it can be accessed in index.js
module.exports = sequelDb;

