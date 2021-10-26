'use strict';

const bcrypt = require('bcrypt');

const Users = (sequelize, DataTypes) => {
  const userTable = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  userTable.beforeCreate(async (user) => {
    let encryptedPassword = await bcrypt.hash(user.password, 10);
    user.password = encryptedPassword;
  });
  return userTable;
};

module.exports = Users;
