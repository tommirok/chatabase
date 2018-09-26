var Sequelize = require('sequelize');
var opts = {
  define: {
    //prevent sequelize from pluralizing table names
    freezeTableName: true
  }
}
var sequelize = new Sequelize('chatroom', '', '', {
  dialect: 'sqlite',
  storage: 'db/database.sqlite',
});

module.exports = {
  DataTypes: Sequelize,
  sequelize: sequelize
};
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });