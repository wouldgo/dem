/*global require,module*/
(function withNode(require, module) {
  'use strict';

  var childProcess = require('child_process')
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

    var newProcess = childProcess.fork(moduleToFork, [owner, fileToProcess])
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
}(require, module));
