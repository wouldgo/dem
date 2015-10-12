/*global process,require,console*/
(function withNode(process,require, console) {
  'use strict';

  var path = require('path')
    , config = require('./config')
    , mongoIpAddr = config.mongoIpAddr || process.env.MONGO_IP
    , model = require('./model')(mongoIpAddr, config.appName)
    , http = require('./http')(config.httpConf, config.sessionExpiration, path, model);

  http.start(function onServerStarted() {

    /*eslint-disable no-console*/
    console.log('Server running at:', http.info.uri);
    /*eslint-enable no-console*/
  });
}(process, require, console));
