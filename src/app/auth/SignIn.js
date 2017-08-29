const Operation = require('src/app/Operation');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('config').jwt;

class SignIn extends Operation {
  constructor({ usersRepository }) {
    super();
    this.usersRepository = usersRepository;
  }

  execute(signInData) {
    const { SUCCESS, ERROR, BAD_REQUEST } = this.outputs;

    this.usersRepository
      .retrieveBy('email', signInData.email)
      .then((user) => {
        this.usersRepository.validPassword(user.uuid, signInData.password).then((valid) => {
          if (valid) {
            const token = jwt.sign(JSON.stringify(user), jwtSecret);
            user['token'] = token
            this.emit(SUCCESS, user);
          } else {
            this.emit(BAD_REQUEST, { type: 'BAD_REQUEST', message: 'email and password combination is not valid' });
          }
        })
        .catch((error) => {
          this.emit(BAD_REQUEST, { type: 'BAD_REQUEST', message: 'email and password combination is not valid' });
        });
      })
      .catch((error) => {
        this.emit(ERROR, error);
      });
  }
}

SignIn.setOutputs(['SUCCESS', 'ERROR', 'UNAUTHORIZED', 'BAD_REQUEST']);

module.exports = SignIn;
