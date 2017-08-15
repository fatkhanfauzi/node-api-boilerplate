const Operation = require('src/app/Operation');

class DestroyUser extends Operation {
  constructor({ usersRepository }) {
    super();
    this.usersRepository = usersRepository;
  }

  execute(uuid) {
    const { SUCCESS, ERROR } = this.outputs;
    
    this.usersRepository
      .destroy(uuid)
      .then(() => {
        this.emit(SUCCESS);
      })
      .catch((error) => {
        this.emit(ERROR, error);
      });
  }
}

DestroyUser.setOutputs(['SUCCESS', 'ERROR']);

module.exports = DestroyUser;
