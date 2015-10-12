/*global require,module*/
(function withNode(require, module) {
  'use strict';

  var /*gdal = require('gdal')
    , GeoJSON = require('geojson')
    ,*/ handleGetRasterInformations = function handleGetRasterInformations(request, reply) {

      reply('OK');
    };

  module.exports = function exportingFunction(/*joi, boom*/) {

    var getRasterInformations = {
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

    return [getRasterInformations];
  };
}(require, module));
