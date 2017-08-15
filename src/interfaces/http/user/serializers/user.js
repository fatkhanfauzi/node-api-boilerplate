const JSONAPISerializer = require('jsonapi-serializer').Serializer;

module.exports = new JSONAPISerializer('users', {
  attributes: ['uuid', 'name', 'age']
});
