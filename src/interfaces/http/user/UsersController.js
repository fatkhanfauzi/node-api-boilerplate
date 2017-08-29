const path = require('path');
const { Router } = require('express');
const { inject } = require('awilix-express');
const Status = require('http-status');
const userSerializer = require(path.join(__dirname, '../serializers/user'));
const container = require(path.join(__dirname, '../../../../src/container'));

const index = (req, res, next) => {
  const { getAllUsers } = req;
  const { SUCCESS, ERROR } = getAllUsers.outputs;

  getAllUsers
    .on(SUCCESS, (users) => {
      const formattedUsers = userSerializer.serialize(users);
      res.status(Status.OK).send(formattedUsers);
    })
    .on(ERROR, next);

  getAllUsers.execute();
}

const create = (req, res, next) => {
  const { createUser } = req;
  const { SUCCESS, ERROR, VALIDATION_ERROR } = createUser.outputs;

  createUser
    .on(SUCCESS, (user) => {
      const formattedUser = userSerializer.serialize(user);
      res.status(Status.CREATED).json(formattedUser);
    })
    .on(VALIDATION_ERROR, next)
    .on(ERROR, next);

  createUser.execute(req.body.user);
}

const retrieve = (req, res, next) => {
  const { retrieveUser } = req;
  const { SUCCESS, ERROR } = retrieveUser.outputs;

  retrieveUser
    .on(SUCCESS, (user) => {
      const formattedUser = userSerializer.serialize(user);
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
      const formattedUser = userSerializer.serialize(user);
      res.status(Status.OK).json(formattedUser);
    })
    .on(VALIDATION_ERROR, next)
    .on(ERROR, next);

  updateUser.execute(req.params.uuid, req.body.user);
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
    const authService = container.resolve('authService')

    router.get('/', authService.authenticate(), inject('getAllUsers'), this.index);
    router.post('/', authService.authenticate(), inject('createUser'), this.create);
    router.get('/:uuid', authService.authenticate(), inject('retrieveUser'), this.retrieve);
    router.put('/:uuid', authService.authenticate(), inject('updateUser'), this.update);
    router.delete('/:uuid', authService.authenticate(), inject('destroyUser'), this.destroy);

    return router;
  },
  index: index,
  retrieve: retrieve,
  create: create,
  update: update,
  destroy: destroy
};

module.exports = UsersController;
