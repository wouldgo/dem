/*global module,require*/
(function withModule(module, require) {
  'use strict';

  var joi = require('joi')
    , boom = require('boom')
    , Hapi = require('hapi')
    , Inert = require('inert')
    , hapiJwt = require('hapi-auth-jwt2')
    , vision = require('vision')
    , lout = require('lout')
    , server = new Hapi.Server();

  module.exports = function exportingFunction(connectionConfiguration, sessionExpiration, model, ignoreStaticContent) {

    var identification = require('./identification')(sessionExpiration, model, joi, boom)
      , demRoutes = require('./dem')(joi, boom)
      , staticRoutes = require('./static');

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

      if (!ignoreStaticContent &&
        staticRoutes &&
        Array.isArray(staticRoutes)) {

        server.route(staticRoutes);
      }
    });

    return server;
  };
}(module, require));
