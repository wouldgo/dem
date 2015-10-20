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
    , Master = require('./worker/master').Master
    , masterWorker = new Master()
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

  module.exports = function exportingFunction(maxFileSize, connectionConfiguration, sessionExpiration, model, messages) {

    var identification = require('./identification')(sessionExpiration, model, joi, boom, messages)
      , demRoutes = require('./dem')(masterWorker, joi, boom, maxFileSize, messages);

    masterWorker.on('worker:message', function onWorkerMessage(pid, message) {

      //console.log(pid, message);
    });
    masterWorker.on('worker:error', function onWorkerError(pid, error) {

      //console.log(pid, error);
    });
    masterWorker.on('worker:disconnect', function onWorkerDisconnection(pid) {

      //console.log(pid);
    });

    server.connection(connectionConfiguration);
    server.register([inert, goodConfiguration, hapiJwt, vision, lout], function onRegister(err) {

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
    });

    return server;
  };
}(module, require));
