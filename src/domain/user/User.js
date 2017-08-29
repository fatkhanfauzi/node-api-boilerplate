const { attributes } = require('structure');

const User = attributes({
  id: Number,
  uuid: {
    type: String
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String
  },
  userName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    email: true
  },
  password: {
    type: String,
    required: false
  },
  token: {
    type: String
  },
  status: {
    type: String
  },
  age: Number,
  lastLoginAt: {
    type: Date
  },
  createdAt: {
    type: Date
  },
  updatedAt: {
    type: Date
  }
})(class User {
  isLegal() {
    return this.age >= User.MIN_LEGAL_AGE;
  }
});

User.MIN_LEGAL_AGE = 21;

module.exports = User;
