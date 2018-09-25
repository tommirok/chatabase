var Database = require('../db/connect');

var Message = Database.sequelize.define('Message', {
  id: { type: Database.DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  title: Database.DataTypes.STRING,
  content: Database.DataTypes.TEXT
});

var Reply = Database.sequelize.define('Reply', {
  id: { type: Database.DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  content: Database.DataTypes.TEXT
});

var Topic = Database.sequelize.define('Topic', {
  id: { type: Database.DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: Database.DataTypes.STRING,
  description: Database.DataTypes.TEXT
});

var User = Database.sequelize.define('User', {
  id: { type: Database.DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  username: Database.DataTypes.STRING,
  password: Database.DataTypes.STRING,
});

Message.belongsTo(User);
Message.belongsTo(Topic);
Reply.belongsTo(Message);
Reply.belongsTo(User);

Message.hasMany(Reply);
Topic.hasMany(Message);
User.hasMany(Message);
User.hasMany(Reply);

module.exports = {
  Message: Message,
  Reply: Reply,
  Topic: Topic,
  User: User
};