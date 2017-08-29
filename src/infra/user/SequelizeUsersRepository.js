const UserMapper = require('./SequelizeUserMapper');

class SequelizeUsersRepository {
  constructor({ UserModel }) {
    this.UserModel = UserModel;
  }

  getAll(...args) {
    return this.UserModel
      .findAll(...args)
      .then((users) => {
        return users.map(UserMapper.toEntity)
      });
  }

  retrieve(uuid) {
    return this.UserModel
      .findOne({
        where: {uuid: uuid}
      })
      .then((user) => {
        return UserMapper.toEntity(user)
      });
  }

  retrieveBy(attr, value) {
    return this.UserModel
      .findOne({
        where: {[attr]: value}
      })
      .then((user) => {
        return UserMapper.toEntity(user)
      });
  }

  validPassword(uuid, password) {
    return this.UserModel
      .findOne({
        where: {uuid: uuid}
      })
      .then((user) => {
        return user.validPassword(password)
      });
  }

  add(user) {
    const { valid, errors } = user.validate();

    if(!valid) {
      const error = new Error('ValidationError');
      error.details = errors;

      return Promise.reject(error);
    }

    return this.UserModel
      .create(UserMapper.toDatabase(user))
      .then((user) => {
        return UserMapper.toEntity(user)
      });
  }

  update(uuid, user) {
    const { valid, errors } = user.validate();

    if(!valid) {
      const error = new Error('ValidationError');
      error.details = errors;

      return Promise.reject(error);
    }

    return this.UserModel
      .update(UserMapper.toDatabase(user), {
        where: {uuid: uuid},
        individualHooks: true
      })
      .then(() => {
        return this.retrieve(uuid)
      });
  }

  destroy(uuid) {
    return this.UserModel
      .destroy({
        where: {uuid: uuid}
      });
  }

  count() {
    return this.UserModel.count();
  }
}

module.exports = SequelizeUsersRepository;
