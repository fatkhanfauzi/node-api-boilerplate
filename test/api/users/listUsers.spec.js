const request = require('test/support/request');
const factory = require('test/support/factory');
const { expect } = require('chai');

describe('API :: GET /api/users', () => {
  context('when there are users', () => {
    beforeEach(() => {
      return factory.createMany('user', 2, [
        { name: 'First' },
        { name: 'Second' }
      ]);
    });

    it('return success with array of users', () => {
      return request().get('/api/users')
        .expect(200)
        .then(({ body }) => {
          expect(body.data).to.have.lengthOf(2);

          expect(body.data[0].attributes.name).to.equal('First');
          expect(Object.keys(body.data[0])).to.include('id');
          expect(body.data[0].attributes).to.have.all.keys('uuid', 'name', 'age');

          expect(body.data[1].attributes.name).to.equal('Second');
          expect(Object.keys(body.data[1])).to.include('id');
          expect(body.data[1].attributes).to.have.all.keys('uuid', 'name', 'age');
        });
    });
  });

  context('when there are no users', () => {
    it('return success with empty array', () => {
      return request().get('/api/users')
        .expect(200)
        .then(({ body }) => {
          expect(body.data).to.have.lengthOf(0);
        });
    });
  });
});
