/*global __dirname,require,console*/
(function withModule(__dirname, require, console) {
  'use strict';

  const joi = require('joi')
    , boom = require('boom')
    , hapiJwt = require('hapi-auth-jwt2')
    , Hapi = require('hapi')
    , Inert = require('inert')
    , path = require('path')
    , server = new Hapi.Server()
    , publicFolder = path.resolve(__dirname, '..', 'www')
    , demRoutes = require('./dem')(joi, boom)
    , validateAuth = function validateAuth(decoded, request, callback) {

      if (decoded &&
        decoded.id) {

        if (decoded.hasOwnProperty('exp')) {

          delete decoded.exp;
        }

        if (decoded.hasOwnProperty('iat')) {

          delete decoded.iat;
        }

        /*model.users.getById(decoded.id).then(function onSuccess() {*/

        return callback(null, true);
        /*}, function onFailure() {

          return callback(null, false);
        });*/
      }
    };

  server.register(hapiJwt, (err) => {
    if (err) {

      throw err;
    }

    server.auth.strategy('jwt', 'jwt', true, {
      'key': 'test',//jwtSalt,
      'validateFunc': validateAuth
    });
  });

  server.register(Inert, () => {

    if (demRoutes &&
      Array.isArray(demRoutes)) {

      server.route(demRoutes);
    }

    server.route({
      'method': 'GET',
      'path': '/{param*}',
      'handler': {
        'directory': {
          'path': publicFolder,
          'listing': false
        }
      }
    });

    server.connection({
      'host': '0.0.0.0',
      'port': 3000,
      'routes': {
        'cors': {
          'origin': ['*'], //atm any host...
          'credentials': true,
          'headers': [
            'Origin',
            'Accept',
            'Content-Type',
            'Content-Length',
            'Authorization',
            'If-None-Match'
          ],
          'additionalHeaders': [
            'X-Requested-With',
            'X-HTTP-Method-Override'
          ]
        }
      }
    });

    server.start(() => {

      /*eslint-disable no-console*/
      console.log('Server running at:', server.info.uri, 'exposing', publicFolder);
      /*eslint-enable no-console*/
    });
  });
}(__dirname, require, console));
