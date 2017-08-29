'use strict';
const Promise = require("bluebird");
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'));

module.exports = function(sequelize, DataTypes) {
  const SALT_FACTOR = 8

  const User = sequelize.define('user', {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    userName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    token: DataTypes.STRING,
    status: {
      type: DataTypes.ENUM,
      values: ['active', 'inactive'],
      defaultValue: 'active'
    },
    age: DataTypes.INTEGER,
    lastLoginAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    classMethods: {
      associate() {
        // associations can be defined here
      }
    },
    instanceMethods: {
      generateHash: function(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(SALT_FACTOR), null);
      },
      validPassword: function(password) {
        return bcrypt.compareSync(password, this.password);
      },
    }
  });

  /**
   * crypt user password
   * @param  {[model]} user model
   * @return {[model]} user model with new password
   */
  const cryptPassword = (user) => {
    if (!user.changed('password')) return;
    user.password = user.generateHash(user.password);
  }

  /***********
   ** Hooks **
   ***********/
  User.beforeCreate(function(user, options) {
    cryptPassword(user);
  })

  User.beforeUpdate(function(user, options) {
    cryptPassword(user);
  })

  return User;
};
