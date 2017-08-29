'use strict';

const path = require('path');
const dataFaker = require(path.join(__dirname, '../../../../src/infra/support/dataFaker'));
const _ = require('lodash');

module.exports = {
  up: function (queryInterface) {
    const testUsers = [];

    for(let i = 0; i < 20; i++) {
      let firstName = dataFaker.first();
      let lastName = dataFaker.last();
      testUsers.push({
        uuid: dataFaker.guid(),
        firstName: firstName,
        lastName: lastName,
        userName: firstName + lastName,
        email: dataFaker.email({domain: "test.com"}),
        status: _.sample(['active', 'inactive']),
        age: dataFaker.age(),
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    return queryInterface.bulkInsert('users', testUsers, {});
  },

  down: function (queryInterface) {
    return queryInterface.bulkDelete('users', null, {});
  }
};
