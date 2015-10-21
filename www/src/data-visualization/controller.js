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
        data.what.what === 'coordinates' &&
        data.what.currentRow &&
        !isNaN(data.what.currentRow) &&
        data.what.points &&
        Array.isArray(data.what.points)) {

        $rootScope.$emit('dem:new-points', {
          'currentRow': data.what.currentRow,
          'points': data.what.points
        });
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
