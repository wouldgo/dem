/*global __dirname,require,module*/
(function withNode(__dirname, require, module) {
  'use strict';

  var path = require('path');

  module.exports = function exportingFunction(masterWorker, joi, boom, maxFileSize, messages) {

    var handlePostRaster = function onUploadRaster(request, reply) {

        if (request &&
          request.auth &&
          request.auth.credentials &&
          request.auth.credentials.id &&
          request.payload &&
          request.payload.file &&
          request.payload.file.path) {

          masterWorker.startProcess(path.resolve(__dirname, 'processing.js'), request.auth.credentials.id, request.payload.file.path);
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
}(__dirname, require, module));
