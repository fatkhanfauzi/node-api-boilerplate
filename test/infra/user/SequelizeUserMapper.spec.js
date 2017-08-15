const { expect } = require('chai');
const User = require('src/domain/user/User');
const SequelizeUserMapper = require('src/infra/user/SequelizeUserMapper');

describe('Infra :: User :: SequelizeUserMapper', () => {
  describe('.toEntity', () => {
    it('returns user instance with passed attributes', () => {
      const mockedSequelizeUser = {
        dataValues: {
          id: 1,
          name: 'The Name',
          age: 21
        }
      };

      const entity = SequelizeUserMapper.toEntity(mockedSequelizeUser);

      expect(entity).to.be.instanceOf(User);
      expect(entity.id).to.equal(1);
      expect(entity.name).to.equal('The Name');
      expect(entity.age).to.equal(21);
    });
  });

  describe('.toDatabase', () => {
    it('returns user object prepared to be persisted', () => {
      const user = new User({
        name: 'Some User',
        age: 21
      });

      const dbUser = SequelizeUserMapper.toDatabase(user);

      expect(dbUser.name).to.equal('Some User');
      expect(dbUser).to.have.all.keys('name', 'age');
    });
  });
});
