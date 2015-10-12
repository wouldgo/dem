/*global require,console,module*/
(function withNode(require, module) {
  'use strict';

  var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , ObjectId = mongoose.Types.ObjectId;

  module.exports = function exportingFunction(mongoDbHost, mongoDbDatabaseName) {

    var db = mongoose.createConnection(mongoDbHost, mongoDbDatabaseName)
      , users = require('./user')(db, Schema, ObjectId);

    db.on('error', function onDatabaseError(err) {

      throw 'Mongoose connection error:' + err;
    });

    db.once('open', function onDatabaseOpen() {

      /*eslint-disable no-console*/
      console.info('Connection to mongodb db done...');
      /*eslint-enable no-console*/
    });

    return {
      'users': users
    };
  };
}(require, module));
