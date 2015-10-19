// jscs:disable disallowAnonymousFunctions
// jscs:disable requireNamedUnassignedFunctions
// jscs:disable requireSpacesInAnonymousFunctionExpression
export class FileSubmitController {

  /*@ngInject*/
  constructor($log, $mdToast, $state, config, FileSubmitService) {

    this.log = $log;
    this.mdToast = $mdToast;
    this.FileSubmitService = FileSubmitService;
    this.state = $state;

    this.fileProcessingStarted = false;
    this.uploading = true;
    this.erroDuringUpload = this.mdToast.simple()
      .content('There was an error during the file upload. You should retry.')
      .position(config.application.toast.position)
      .hideDelay(config.application.toast.hideTimeout);
  }

  processFile(file) {

    this.fileProcessingStarted = true;
    this.FileSubmitService.processUpload(file).then(() => {

      this.uploading = true;
      this.state.go('data-visualization');
    }, () => {

      this.uploading = false;
      this.file = undefined;
      this.mdToast.show(this.erroDuringUpload);
    }, (evt) => {

      this.uploading = true;
      this.percentage = parseInt(100.0 * evt.loaded / evt.total, 10);
    });
  }
}
// jscs:enable disallowAnonymousFunctions
// jscs::enable requireNamedUnassignedFunctions
// jscs::enable requireSpacesInAnonymousFunctionExpression
