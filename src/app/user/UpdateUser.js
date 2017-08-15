const Operation = require('src/app/Operation');
const User = require('src/domain/user/User');

class UpdateUser extends Operation {
  constructor({ usersRepository }) {
    super();
    this.usersRepository = usersRepository;
  }

  execute(uuid, userData) {
    const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;

    const user = new User(userData);

    this.usersRepository
      .update(uuid, user)
      .then((updatedUser) => {
        this.emit(SUCCESS, updatedUser);
      })
      .catch((error) => {
        if(error.message === 'ValidationError') {
          return this.emit(VALIDATION_ERROR, error);
        }

        this.emit(ERROR, error);
      });
  }
}

UpdateUser.setOutputs(['SUCCESS', 'ERROR', 'VALIDATION_ERROR']);

module.exports = UpdateUser;
