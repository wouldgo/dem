// jscs:disable disallowAnonymousFunctions
// jscs:disable requireNamedUnassignedFunctions
// jscs:disable requireSpacesInAnonymousFunctionExpression
export class HomeController {

  /*@ngInject*/
  constructor($log, Upload) {
    this.log = $log;
    this.Upload = Upload;
  }

  processFile(file) {
    this.log.info(file);
  }
}
// jscs:enable disallowAnonymousFunctions
// jscs::enable requireNamedUnassignedFunctions
// jscs::enable requireSpacesInAnonymousFunctionExpression
