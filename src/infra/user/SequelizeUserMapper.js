const User = require('src/domain/user/User');

const SequelizeUserMapper = {
  toEntity({ dataValues }) {
    const { id, uuid, name, age } = dataValues;

    return new User({ id, uuid, name, age });
  },

  toDatabase(survivor) {
    const { name, age } = survivor;

    return { name, age };
  }
};

module.exports = SequelizeUserMapper;
