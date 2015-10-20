/*global global,require,module*/
(function withNode(global, require, module) {
  'use strict';

  var amqp = require('amqplib');

  module.exports = function exportingFunction(amqpConfiguration) {

    var AmqpPublish = function AmqpPublish() {
      var that = this;

      amqp.connect(amqpConfiguration.host).then(function onConnection(conn) {

        conn.createChannel().then(function onChannelCreated(ch) {

          ch.assertExchange(amqpConfiguration.exchangeName, 'fanout', {
            'durable': false
          }).then(function publish() {

            // jscs:disable disallowDanglingUnderscores
            /*eslint-disable no-underscore-dangle*/
            that.__ch__ = ch;
            /*eslint-enable no-underscore-dangle*/
            // jscs:enable disallowDanglingUnderscores
          });
        });
      });
    };

    AmqpPublish.prototype.send = function send(data) {

      if (!data) {

        throw new Error('You must provide a valid payload to send');
      }

      if (typeof data === 'object') {

        data = JSON.stringify(data);
      }

      // jscs:disable disallowDanglingUnderscores
      /*eslint-disable no-underscore-dangle*/
      this.__ch__.publish(amqpConfiguration.exchangeName, '', new global.Buffer(data));
      /*eslint-enable no-underscore-dangle*/
      // jscs:enable disallowDanglingUnderscores
    };

    AmqpPublish.prototype.close = function close() {

      // jscs:disable disallowDanglingUnderscores
      /*eslint-disable no-underscore-dangle*/
      this.__ch__.close();
      /*eslint-enable no-underscore-dangle*/
      // jscs:enable disallowDanglingUnderscores
    };

    return AmqpPublish;
  };
}(global, require, module));
