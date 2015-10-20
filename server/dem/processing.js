/* global module,require*/
(function withNode(module, require) {
  'use strict';

  var gdal = require('gdal');

  module.exports = function exportingFunction(comunicator) {

    var newDemFile = function newDemFile(userIdentifier, filePath) {
      var demFile = gdal.open(filePath)
        , geoTransform = demFile.geoTransform;

      demFile.bands.forEach(function iterator(aRasterBand) {
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
                comunicator.sendTo('__dem_user__', userIdentifier, {
                  'what': 'point',
                  'payload': [xPosition, yPosition, aPixelHeight]
                });
                console.log([xPosition, yPosition, aPixelHeight]);
              }
            }
          }
        }
      });
    };

    return newDemFile;
  };
}(module, require));
