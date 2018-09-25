const Sequelize = require('sequelize');
const conn = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'sqlite' | 'postgres' ,
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  // SQLite path
  storage: 'database.sqlite'
});
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
module.exports = conn;