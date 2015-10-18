/*global module,require*/
(function withModule(module, require) {
  'use strict';

  var joi = require('joi')
    , boom = require('boom')
    , Hapi = require('hapi')
    , inert = require('inert')
    , hapiJwt = require('hapi-auth-jwt2')
    , good = require('good')
    , vision = require('vision')
    , lout = require('lout')
    , server = new Hapi.Server()
    , goodConfiguration = {
        'register': good,
        'options': {
          'reporters': [{
            'reporter': require('good-console'),
            'events': {
              'response': '*',
              'log': '*'
            }
          }]
        }
      };

  module.exports = function exportingFunction(connectionConfiguration, sessionExpiration, model) {

    var identification = require('./identification')(sessionExpiration, model, joi, boom)
      , demRoutes = require('./dem')(joi, boom);

    server.connection(connectionConfiguration);
    server.register([inert, goodConfiguration, hapiJwt, vision, lout], function onRegister(err) {

      if (err) {

        throw err;
      }

      //identification.comunicator
      server.auth.strategy('jwt', 'jwt', true, identification.strategy);
      if (demRoutes &&
        Array.isArray(demRoutes)) {

        server.route(demRoutes);
      }

      if (identification.routes &&
        Array.isArray(identification.routes)) {

        server.route(identification.routes);
      }
    });

    return server;
  };
}(module, require));
