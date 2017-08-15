const UserMapper = require('./SequelizeUserMapper');

class SequelizeUsersRepository {
  constructor({ UserModel }) {
    this.UserModel = UserModel;
  }

  getAll(...args) {
    return this.UserModel
      .findAll(...args)
      .then((users) => 
        users.map(UserMapper.toEntity)
      );
  }

  retrieve(uuid) {
    return this.UserModel
      .findOne({
        where: {uuid: uuid}
      })
      .then((user) => UserMapper.toEntity(user));
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
      .then(UserMapper.toEntity);
  }

  update(uuid, user) {
    const { valid, errors } = user.validate();

    if(!valid) {
      const error = new Error('ValidationError');
      error.details = errors;

      return Promise.reject(error);
    }

    return this.UserModel
      .update(
        UserMapper.toDatabase(user)
      , {
        where: {uuid: uuid}
      })
      .then(() =>
        this.retrieve(uuid)
      );
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
