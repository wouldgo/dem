// jscs:disable disallowAnonymousFunctions
// jscs:disable requireNamedUnassignedFunctions
// jscs:disable requireSpacesInAnonymousFunctionExpression
export class FileSubmitService {

  /*@ngInject*/
  constructor(Upload) {
    this.Upload = Upload;
  }

  processUpload(file) {

    return this.Upload.upload({
      'url': 'upload/url',
      'data': {
        'file': file
      },
      'headers': {
        'Authorization': 'xxx'
      },
      'withCredentials': true
    });
  }
}
// jscs:enable disallowAnonymousFunctions
// jscs::enable requireNamedUnassignedFunctions
// jscs::enable requireSpacesInAnonymousFunctionExpression
