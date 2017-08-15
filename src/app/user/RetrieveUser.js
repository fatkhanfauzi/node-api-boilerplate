const Operation = require('src/app/Operation');

class RetrieveUser extends Operation {
  constructor({ usersRepository }) {
    super();
    this.usersRepository = usersRepository;
  }

  execute(uuid) {
    const { SUCCESS, ERROR } = this.outputs;

    this.usersRepository
      .retrieve(uuid)
      .then((user) => {
        this.emit(SUCCESS, user);
      })
      .catch((error) => {
        this.emit(ERROR, error);
      });
  }
}

RetrieveUser.setOutputs(['SUCCESS', 'ERROR']);

module.exports = RetrieveUser;
