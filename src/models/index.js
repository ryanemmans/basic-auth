'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const UsersModel = require('./users.js');

let sequelize = new Sequelize('sqlite:memory');

const Users = UsersModel(sequelize, DataTypes);

module.exports = {
  db: sequelize,
  Users,
};
