/*global module,require*/
(function withNode(module, require) {
  'use strict';

  var crypto = require('crypto')
      , identificationRoutes = require('./routes')
      , jwtSaltLength = 110
      , jwtSalt = crypto.randomBytes(Math.ceil(jwtSaltLength * 3 / 4))
          .toString('base64')
          .slice(0, jwtSaltLength)
          .replace(/\+/g, '0')
          .replace(/\//g, '0')
      , comunicator = require('comunicator')(jwtSalt)
      , validateAuth = function validateAuth(model, decoded, request, callback) {

        if (decoded &&
          decoded.id) {

          if (decoded.hasOwnProperty('exp')) {

            delete decoded.exp;
          }

          if (decoded.hasOwnProperty('iat')) {

            delete decoded.iat;
          }

          model.users.getById(decoded.id).then(function onSuccess() {

            return callback(null, true);
          }, function onFailure() {

            return callback(null, false);
          });
        } else {

          return callback(null, false);
        }
      };

  module.exports = function exportingFunction(sessionExpiration, model, joi, boom) {

    return {
      'comunicator': comunicator,
      'routes': identificationRoutes(jwtSalt, sessionExpiration, model, joi, boom),
      'strategy': {
        'key': jwtSalt,
        'validateFunc': validateAuth.bind(this, model)
      }
    };
  };
}(module, require));
