// jscs:disable disallowAnonymousFunctions
// jscs:disable requireNamedUnassignedFunctions
// jscs:disable requireSpacesInAnonymousFunctionExpression
export class FileSubmitController {

  /*@ngInject*/
  constructor($log, FileSubmitService) {

    this.log = $log;
    this.FileSubmitService = FileSubmitService;

    this.fileProcessingStarted = false;
  }

  processFile(file) {

    this.fileProcessingStarted = true;
    this.FileSubmitService.processUpload(file).then((resp) => {

      this.log.info('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
    }, (resp) => {

      this.log.info('Error status: ' + resp.status);
    }, (evt) => {
      var progressPercentage = parseInt(100.0 * evt.loaded / evt.total, 10);

      this.log.info('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
    });
  }
}
// jscs:enable disallowAnonymousFunctions
// jscs::enable requireNamedUnassignedFunctions
// jscs::enable requireSpacesInAnonymousFunctionExpression
