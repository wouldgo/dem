/*global __dirname,require,module*/
(function withNode(__dirname, require, module) {
  'use strict';

  var childProcess = require('child_process')
    , fork = childProcess.fork
    , EventEmitter = require('events')
    , util = require('util')
    , Master = function Master() {

      EventEmitter.call(this);
      this.children = {};
    };

  util.inherits(Master, EventEmitter);
  Master.prototype.startProcess = function startProcess(moduleToFork, owner, fileToProcess) {

    if (!moduleToFork ||
      !owner ||
      !fileToProcess) {

      throw new Error('Missing mandatory parameters');
    }

    var newProcess = fork(moduleToFork, [owner, fileToProcess], {
        'execArgv': []
      })
      , that = this;

    newProcess.on('message', function onMessage(message) {
      that.emit('worker:message', this.pid, message);
    });

    newProcess.on('error', function onError(error) {
      that.emit('worker:error', this.pid, error);
    });

    newProcess.on('disconnect', function onDisconnect() {

      that.emit('worker:disconnect', this.pid);
      this.kill();
      delete that.children[this.pid];
    });

    this.children[newProcess.pid] = newProcess;
  };

  module.exports = {
    'Master': Master
  };
}(__dirname, require, module));
