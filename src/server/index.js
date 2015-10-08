/*global __dirname,require,console,module*/
(function withModule(__dirname, require, console, module) {
  'use strict';

  var Hapi = require('hapi')
    , Inert = require('inert')
    , server = new Hapi.Server()
    , path = require('path')
    , publicFolder = path.resolve(__dirname, '..', 'www')
    , startServer = function startServer() {

      server.start(function onStart() {

        console.log('Server running at:', server.info.uri);
      });
    };

  server.register(Inert, function onRegister() {

    server.connection({
      'host': '0.0.0.0',
      'port': 3000
    });

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

    module.exports = {
      'startServer': startServer
    };
  });
}(__dirname, require, console, module));
