/*global process,require,console*/
(function withNode(process,require, console) {
  'use strict';

  var config = require('./config')
    , messages = require('./messages')
    , mongoIpAddr = config.mongoIpAddr || process.env.MONGO_IP
    , model = require('./model')(mongoIpAddr, config.appName)
    , http = require('./http')(config.maxFileSize, config.httpConf, config.sessionExpiration, model, messages);

  http.start(function onServerStarted() {

    /*eslint-disable no-console*/
    console.log('Server running at:', http.info.uri);
    /*eslint-enable no-console*/
  });
}(process, require, console));
