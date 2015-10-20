/* global global,process,require*/
(function withNode(global, process, require) {
  'use strict';

  var gdal = require('gdal')
    , minimist = require('minimist')
    , params = minimist(process.argv.slice(2))
    , demFile
    , geoTransform;

  if (!params) {

    process.exit(1);
  }

  demFile = gdal.open(params._[1]);
  geoTransform = demFile.geoTransform;
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
      process.send({
        'what': 'max-points',
        'identifier': params._[0],
        'maxValues': [xMaxValue, yMaxValue]
      });

      global.setTimeout(function onTimeout() {

        for (xIndexValue = 0; xIndexValue < xMaxValue; xIndexValue += 1) {

          for (yIndexValue = 0; yIndexValue < yMaxValue; yIndexValue += 1) {
            aPixelHeight = aRasterBand.pixels.get(xIndexValue, yIndexValue);

            xPosition = geoTransform[0] + xIndexValue * geoTransform[1] + yIndexValue * geoTransform[2];
            yPosition = geoTransform[3] + xIndexValue * geoTransform[4] + yIndexValue * geoTransform[5];
            process.send({
              'what': 'coordinate',
              'identifier': params._[0],
              'point': [xPosition, yPosition, aPixelHeight]
            });
          }
        }
        process.exit();
      }, 1000);
    }
  });
}(global, process, require));
