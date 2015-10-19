// jscs:disable disallowAnonymousFunctions
// jscs:disable requireNamedUnassignedFunctions
// jscs:disable requireSpacesInAnonymousFunctionExpression
export class IdentificationController {

  /*@ngInject*/
  constructor($log, $rootScope, $state, $mdToast, config, IdentificationService) {
    this.log = $log;
    this.rootScope = $rootScope;
    this.state = $state;
    this.mdToast = $mdToast;
    this.IdentificationService = IdentificationService;

    this.validEmailPlease = this.mdToast.simple()
      .content('Please provide a valid email')
      .position(config.application.toast.position)
      .hideDelay(config.application.toast.hideTimeout);
    this.errorDuringAccountCreation = this.mdToast.simple()
      .position(config.application.toast.position)
      .hideDelay(config.application.toast.hideTimeout);
  }

  create(user) {

    if (user &&
      user.email) {

      this.IdentificationService.createAccount(user.email).then(() => {

        this.state.go('file-submit');
      }).catch((error) => {

        this.mdToast.show(this.errorDuringAccountCreation
          .content(`An error occurred during account creation: ${error}`));
      });
    } else {

      this.mdToast.show(this.validEmailPlease);
    }
  }

  logout() {

    this.rootScope.$emit('identification:user-logout', {
      'userIdentifier': this.rootScope.userIdentifier
    });
    this.state.go('identification');
  }

  delete() {

    this.IdentificationService.deleteAccount().then(() => {

      this.state.go('identification');
    });
  }

  isUserLoggedIn() {

    return this.IdentificationService.isUserLoggedIn();
  }
}
// jscs:enable disallowAnonymousFunctions
// jscs::enable requireNamedUnassignedFunctions
// jscs::enable requireSpacesInAnonymousFunctionExpression
