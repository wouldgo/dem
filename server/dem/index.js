/*global require,module*/
(function withNode(require, module) {
  'use strict';

  //, GeoJSON = require('geojson');
  var demUser = '_dem_user_'
    , gdal = require('gdal')
    , handlePostRaster = function onUploadRaster(boom, comunicator, messages, request, reply) {

      if (request &&
        request.auth &&
        request.auth.credentials &&
        request.auth.credentials.id &&
        request.payload &&
        request.payload.file &&
        request.payload.file.path) {
        var userIdentifier = request.auth.credentials.id
          , demFile;

        try {

          demFile = gdal.open(request.payload.file.path);

          comunicator.sendTo(demUser, userIdentifier, demFile);//TODO continue here
          reply('ok');
        } catch (e) {

          reply(boom.badData(e));
        }
      } else {

        reply(boom.badData(messages.invalidData));
      }
    };

  module.exports = function exportingFunction(joi, boom, comunicator, messages) {

    var uploadRaster = {
        'method': 'POST',
        'path': '/raster',
        'config': {
          'auth': 'jwt',
          'payload': {
            'maxBytes': 1000000000,
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
        'handler': handlePostRaster.bind(this, boom, comunicator, messages)
      };

    return [
      uploadRaster
    ];
  };
}(require, module));
