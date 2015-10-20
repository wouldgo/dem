// jscs:disable disallowAnonymousFunctions
// jscs:disable requireNamedUnassignedFunctions
// jscs:disable requireSpacesInAnonymousFunctionExpression
export class DataVisualizationController {

  /*@ngInject*/
  constructor($rootScope, $scope, $stateParams) {

    this.maxPoints = $stateParams['max-points'];
    let unregisterOnComunicatorToMe = $rootScope.$on('comunicator:to-me', (eventInfo, data) => {

      if (this.maxPoints) {

        $rootScope.$emit('dem:max-points', this.maxPoints);
        delete this.maxPoints;
      }

      if (data &&
        data.what &&
        data.what.what === 'coordinate' &&
        data.what.point &&
        Array.isArray(data.what.point)) {

        $rootScope.$emit('dem:new-point', data.what.point);
      }
    });

    $scope.$on('$destroy', () => {

      unregisterOnComunicatorToMe();
    });
  }
}
// jscs:enable disallowAnonymousFunctions
// jscs::enable requireNamedUnassignedFunctions
// jscs::enable requireSpacesInAnonymousFunctionExpression
