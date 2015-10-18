export const FileSubmitFactory = /*@ngInject*/ function FileSubmitFactory($log, Upload, config) {
  'use strict';

  let processUpload = function processUpload(file) {

    return Upload.upload({
      'url': config.http.address + '/raster',
      'data': {
        'file': file
      }
    });
  };

  return {
    processUpload
  };
};
