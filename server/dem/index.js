/*global require,module*/
(function withNode(require, module) {
  'use strict';

  module.exports = function exportingFunction(amqpConfiguration, joi, boom, maxFileSize, messages) {

    var AmqpPublish = require('../amqp/amqp-pub')(amqpConfiguration)
      , pub = new AmqpPublish()
      , handlePostRaster = function onUploadRaster(request, reply) {

        if (request &&
          request.auth &&
          request.auth.credentials &&
          request.auth.credentials.id &&
          request.payload &&
          request.payload.file &&
          request.payload.file.path) {

          pub.send({
            'identifier': request.auth.credentials.id,
            'file': request.payload.file.path
          });
          reply({
            'status': 'started'
          });
        } else {

          reply(boom.badData(messages.invalidData));
        }
      }
      , uploadRaster = {
        'method': 'POST',
        'path': '/raster',
        'config': {
          'auth': 'jwt',
          'payload': {
            'maxBytes': maxFileSize,
            'output': 'file',
            'parse': true
          },
          'validate': {
            'payload': {
              'file': joi.object().keys({
                'filename': joi.string().min(1),
                'path': joi.string().min(1),
                'headers': joi.any().optional(),
                'bytes': joi.number().greater(10)
              })
            }
          }
        },
        'handler': handlePostRaster
      };

    return [
      uploadRaster
    ];
  };
}(require, module));
