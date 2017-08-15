'use strict';

const path = require('path');
const dataFaker = require(path.join(__dirname, '../../../../src/infra/support/dataFaker'));

module.exports = {
  up: function (queryInterface) {
    const testUsers = [];

    for(let i = 0; i < 20; i++) {
      testUsers.push({
        uuid: dataFaker.guid(),
        name: dataFaker.name(),
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
