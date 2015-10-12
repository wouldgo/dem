/*global __dirname,module,require*/
(function withModule(__dirname, module, require) {
  'use strict';

  var joi = require('joi')
    , boom = require('boom')
    , Hapi = require('hapi')
    , Inert = require('inert')
    , hapiJwt = require('hapi-auth-jwt2')
    , vision = require('vision')
    , lout = require('lout')
    , server = new Hapi.Server();

  module.exports = function exportingFunction(connectionConfiguration, sessionExpiration, path, model) {

    var publicFolder = path.resolve(__dirname, '..', 'www')
      , identification = require('./identification')(sessionExpiration, model, joi, boom)
      , demRoutes = require('./dem')(joi, boom);

    server.connection(connectionConfiguration);
    server.register([hapiJwt, Inert, vision, lout], function onRegister(err) {

      if (err) {

        throw err;
      }

      server.auth.strategy('jwt', 'jwt', true, identification.strategy);
      if (demRoutes &&
        Array.isArray(demRoutes)) {

        server.route(demRoutes);
      }

      if (identification.routes &&
        Array.isArray(identification.routes)) {

        server.route(identification.routes);
      }

      server.route({
        'method': 'GET',
        'path': '/{param*}',
        'config': {
          'auth': false
        },
        'handler': {
          'directory': {
            'path': publicFolder,
            'listing': false
          }
        }
      });
    });

    return server;
  };
}(__dirname, module, require));
