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

  module.exports = function exportingFunction(amqpConfiguration, maxFileSize, connectionConfiguration, sessionExpiration, model, messages) {

    var identification = require('./identification')(sessionExpiration, model, joi, boom, messages)
      , demRoutes = require('./dem')(amqpConfiguration, joi, boom, maxFileSize, messages)
      , processing = require('./dem/processing')(identification.comunicator);

    require('./amqp/amqp-sub')(amqpConfiguration, function onMessage(message) {//TODO spwan new process

      if (message) {

        processing(message.identifier, message.file);
      } else {

        throw new Error('Empty message arrived');
      }
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
