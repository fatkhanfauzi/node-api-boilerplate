const User = require('src/domain/user/User');

const SequelizeUserMapper = {
  toEntity({ dataValues }) {
    const { id, uuid, firstName, lastName, userName, email, password, token, status, age, lastLoginAt, createdAt, updatedAt } = dataValues;

    return new User({ id, uuid, firstName, lastName, userName, email, password, token, status, age, lastLoginAt, createdAt, updatedAt });
  },

  toDatabase(survivor) {
    const { firstName, lastName, userName, email, password, token, status, age, lastLoginAt, createdAt, updatedAt } = survivor;

    return { firstName, lastName, userName, email, password, token, status, age, lastLoginAt, createdAt, updatedAt };
  }
};

module.exports = SequelizeUserMapper;
