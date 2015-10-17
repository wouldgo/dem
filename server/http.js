/*global module,require*/
(function withModule(module, require) {
  'use strict';

  var joi = require('joi')
    , boom = require('boom')
    , Hapi = require('hapi')
    , hapiJwt = require('hapi-auth-jwt2')
    , vision = require('vision')
    , lout = require('lout')
    , server = new Hapi.Server();

  module.exports = function exportingFunction(connectionConfiguration, sessionExpiration, model) {

    var identification = require('./identification')(sessionExpiration, model, joi, boom)
      , demRoutes = require('./dem')(joi, boom);

    server.connection(connectionConfiguration);
    server.register([hapiJwt, vision, lout], function onRegister(err) {

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
