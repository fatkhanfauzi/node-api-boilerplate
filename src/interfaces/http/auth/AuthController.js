const path = require('path');
const { Router } = require('express');
const { inject } = require('awilix-express');
const Status = require('http-status');
const userSerializer = require(path.join(__dirname, '../serializers/user'));

const signIn = (req, res, next) => {
  const { signIn } = req;
  const { SUCCESS, ERROR, BAD_REQUEST } = signIn.outputs;

  signIn
    .on(SUCCESS, (user) => {
      const formattedUser = userSerializer.serialize(user);
      res.status(Status.OK).send(formattedUser);
    })
    .on(BAD_REQUEST, next)
    .on(ERROR, next);

  signIn.execute(req.body.user);
}

const signUp = (req, res, next) => {
  res.status(Status.OK).json({success: true, msg: 'sign up.'});
}

const AuthController = {
  get router() {
    const router = Router();

    router.post('/signin', inject('signIn'), this.signIn);
    router.post('/signup', this.signUp);

    return router;
  },
  signIn: signIn,
  signUp: signUp
};

module.exports = AuthController;
