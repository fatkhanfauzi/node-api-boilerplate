const request = require('test/support/request');
const { expect } = require('chai');

describe('API :: POST /api/users', () => {
  context('when sent data is ok', () => {
    it('creates and returns 200 and the new user', () => {
      return request()
        .post('/api/users')
        .send({
          name: 'New User',
          age: 20
        })
        .expect(201)
        .then(({ body }) => {
          expect(body.data.id).to.exist;
          expect(body.data.attributes.name).to.equal('New User');
          expect(body.data.attributes.age).to.equal(20);
          expect(body.data.attributes).to.have.all.keys('uuid', 'name', 'age');
        });
    });
  });

  context('when name is missing', () => {
    it('does not create and returns 400 with the validation error', () => {
      return request()
        .post('/api/users')
        .expect(400)
        .then(({ body }) => {
          expect(body.type).to.equal('ValidationError');
          expect(body.details).to.have.lengthOf(1);
          expect(body.details[0].message).to.equal('"name" is required');
        });
    });
  });
});
