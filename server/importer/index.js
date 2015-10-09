/*global require, console, JSON*/
(function withNode(require, console, JSON) {
  'use strict';

  var gdal = require('gdal')
    , GeoJSON = require('geojson')
    , dataset = gdal.open('./trentino-altoadige/taa.asc')
    , geoTransform = dataset.geoTransform
    , toGeoJson = [];

  console.log('Projection:', dataset.srs ? dataset.srs.toWKT() : 'none');
  dataset.bands.forEach(function iterator(aRasterBand) {
    var xMaxValue
      , yMaxValue
      , xIndexValue
      , yIndexValue
      , aPixelHeight
      , xPosition
      , yPosition;

    if (aRasterBand &&
      aRasterBand.noDataValue &&
      aRasterBand.size &&
      aRasterBand.size.x &&
      aRasterBand.size.y) {

      xMaxValue = aRasterBand.size.x;
      yMaxValue = aRasterBand.size.y;
      for (xIndexValue = 0; xIndexValue < xMaxValue; xIndexValue += 1) {

        for (yIndexValue = 0; yIndexValue < yMaxValue; yIndexValue += 1) {
          aPixelHeight = aRasterBand.pixels.get(xIndexValue, yIndexValue);

          if (aPixelHeight !== aRasterBand.noDataValue) {

            xPosition = geoTransform[0] + xIndexValue * geoTransform[1] + yIndexValue * geoTransform[2];
            yPosition = geoTransform[3] + xIndexValue * geoTransform[4] + yIndexValue * geoTransform[5];
            toGeoJson.push({
              'coords': [xPosition, yPosition, aPixelHeight]
            });
          }
        }
      }
    }
  });

  GeoJSON.parse(toGeoJson, {
    'Point': 'coords'
  }, function finishedToImport(geojson) {

    console.log(JSON.stringify(geojson));
  });
}(require, console, JSON));
