const JSONAPISerializer = require('jsonapi-serializer').Serializer;

module.exports = new JSONAPISerializer('users', {
  keyForAttribute: 'camelCase',
  attributes: [
    'uuid',
    'firstName',
    'lastName',
    'userName',
    'email',
    'token',
    'status',
    'age',
    'lastLoginAt',
    'createdAt',
    'updatedAt'
  ]
});
