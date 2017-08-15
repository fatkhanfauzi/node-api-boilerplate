const { Router } = require('express');
const { inject } = require('awilix-express');
const Status = require('http-status');
const UserSerializer = require('./serializers/user');

const index = (req, res, next) => {
  const { getAllUsers } = req;
  const { SUCCESS, ERROR } = getAllUsers.outputs;

  getAllUsers
    .on(SUCCESS, (users) => {
      const formatterUsers = UserSerializer.serialize(users);
      res.status(Status.OK).send(formatterUsers);
    })
    .on(ERROR, next);

  getAllUsers.execute();
}

const create = (req, res, next) => {
  const { createUser } = req;
  const { SUCCESS, ERROR, VALIDATION_ERROR } = createUser.outputs;

  createUser
    .on(SUCCESS, (user) => {
      const formattedUser = UserSerializer.serialize(user);
      res.status(Status.CREATED).json(formattedUser);
    })
    .on(VALIDATION_ERROR, (error) => {
      res.status(Status.BAD_REQUEST).json({
        type: 'ValidationError',
        details: error.details
      });
    })
    .on(ERROR, next);

  createUser.execute(req.body);
}

const retrieve = (req, res, next) => {
  const { retrieveUser } = req;
  const { SUCCESS, ERROR } = retrieveUser.outputs;

  retrieveUser
    .on(SUCCESS, (user) => {
      const formattedUser = UserSerializer.serialize(user);
      res.status(Status.OK).send(formattedUser);
    })
    .on(ERROR, next);

  retrieveUser.execute(req.params.uuid);
}

const update = (req, res, next) => {
  const { updateUser } = req;
  const { SUCCESS, ERROR, VALIDATION_ERROR } = updateUser.outputs;

  updateUser
    .on(SUCCESS, (user) => {
      const formattedUser = UserSerializer.serialize(user);
      res.status(Status.OK).json(formattedUser);
    })
    .on(VALIDATION_ERROR, (error) => {
      res.status(Status.BAD_REQUEST).json({
        type: 'ValidationError',
        details: error.details
      });
    })
    .on(ERROR, next);

  updateUser.execute(req.params.uuid, req.body);
}

const destroy = (req, res, next) => {
  const { destroyUser } = req;
  const { SUCCESS, ERROR } = destroyUser.outputs;

  destroyUser
    .on(SUCCESS, (user) => {
      res.status(Status.NO_CONTENT).send();
    })
    .on(ERROR, next);

  destroyUser.execute(req.params.uuid);
}

const UsersController = {
  get router() {
    const router = Router();

    router.get('/', inject('getAllUsers'), this.index);
    router.post('/', inject('createUser'), this.create);
    router.get('/:uuid', inject('retrieveUser'), this.retrieve);
    router.put('/:uuid', inject('updateUser'), this.update);
    router.delete('/:uuid', inject('destroyUser'), this.destroy);

    return router;
  },
  index: index,
  retrieve: retrieve,
  create: create,
  update: update,
  destroy: destroy
};

module.exports = UsersController;
