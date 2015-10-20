// jscs:disable disallowAnonymousFunctions
// jscs:disable requireNamedUnassignedFunctions
// jscs:disable requireSpacesInAnonymousFunctionExpression
export class DataVisualizationController {

  /*@ngInject*/
  constructor($log, $rootScope, $scope) {

    let unregisterOnComunicatorToMe = $rootScope.$on('comunicator:to-me', (eventInfo, data) => {

      $log.info(data);
    });

    $scope.$on('$destroy', () => {

      unregisterOnComunicatorToMe();
    });
  }
}
// jscs:enable disallowAnonymousFunctions
// jscs::enable requireNamedUnassignedFunctions
// jscs::enable requireSpacesInAnonymousFunctionExpression
