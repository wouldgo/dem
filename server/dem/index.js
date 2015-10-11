/*global require,module*/
(function withNode(require, module) {
  'use strict';

  /*const gdal = require('gdal')
    , GeoJSON = require('geojson');*/

  module.exports = function exportingFunction(/*joi, boom*/) {

    let handleGetRasterInformations = function handleGetRasterInformations(request, reply) {

      reply('OK');
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

    return [getRasterInformations];
  };
}(require, module));
