'use strict';

require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const UsersModel = require('./users-model.js');

let DATABASE_URL = process.env.DATA_URL || 'sqlite:memory';

const options = process.env.NODE_ENV === 'production'
  ? {
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  }
  : {};

let sequelizeInstance = new Sequelize(DATABASE_URL, options);
// const sequelize = new Sequelize(process.env.DATABASE_URL);


// instantiate our DB with our models
const Users = UsersModel(sequelizeInstance, DataTypes);

// These models will not work with another database technology.
// channels.hasMany(messages, { foreignKey: 'channelId', sourceKey: 'id'});
// messages.belongsTo(channels, { foreignKey: 'channelId', targetKey: 'id'});

module.exports = {
  db: sequelizeInstance,
  Users,
};
