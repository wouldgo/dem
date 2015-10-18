/*global require,module*/
(function withNode(require, module) {
  'use strict';

  var /*gdal = require('gdal')
    , GeoJSON = require('geojson')
    ,*/ handleGetRasterInformations = function handleGetRasterInformations(request, reply) {

      reply('OK');
    };

  module.exports = function exportingFunction(/*joi, boom*/) {

    var uploadRaster = {
        'method': 'POST',
        'path': '/raster',
        'config': {
          'auth': 'jwt',
          'payload': {
            'maxBytes': 1000000000,
            'output': 'stream',
            'parse': true
          }
        },
        'handler': function onUploadRaster(request, reply) {

          reply('ok');
        }
      }
      , getRasterInformations = {
        'method': 'GET',
        'path': '/raster-info',
        'config': {
          'auth': 'jwt'/*,
          'validate': {
            'query': {
              'oauthio': joi.string().required()
            }
          }*/
        },
        'handler': handleGetRasterInformations
      };

    return [
      uploadRaster,
      getRasterInformations
    ];
  };
}(require, module));
