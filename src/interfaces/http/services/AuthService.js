'use strict';

const passport = require("passport");  
const passportJWT = require("passport-jwt");  
const JwtStrategy = passportJWT.Strategy;  
const ExtractJwt = passportJWT.ExtractJwt;  
const { jwtSecret, jwtSession, jwtParam } = require('config').jwt;
const USED_STRATEGY = "jwt"
const _jwtStrategy = Symbol('jwtStrategy');

const _options = {
  jwtFromRequest: ExtractJwt.fromUrlQueryParameter(jwtParam),
  secretOrKey: jwtSecret
}

class AuthService {
  constructor({ usersRepository }) {
    this.usersRepository = usersRepository;
    passport.use(this[_jwtStrategy]());
  }  

  initialize() {
    return passport.initialize();
  }

  authenticate() {
    return passport.authenticate(USED_STRATEGY, jwtSession);
  }

  ///////////////
  /// PRIVATE ///
  ///////////////

  /**
   * strategy definition
   */ 
  [_jwtStrategy]() { 
    return new JwtStrategy(_options, (jwt_payload, done) => {
      this.usersRepository.retrieveBy('id', jwt_payload.id)
        .then((user) => {
          if (user) {
            done(null, user);
          } else {
            done(null, false);
          }
      });
    })
  }
}

module.exports = AuthService;
