import 'ui-router-extras';

const routing = function routing(module, futureRoutes) {
  'use strict';

  module.requires.push('ct.ui.router.extras.future');
  var RouterConfig = ['$stateProvider', '$futureStateProvider', function RouterConfig($stateProvider, $futureStateProvider) {

    $futureStateProvider.stateFactory('load', ['$q', '$ocLazyLoad', 'futureState', function stateFactory($q, $ocLazyLoad, futureState) {

      return $q((resolve, reject) => {

        $ocLazyLoad.load(futureState.src).then(function onLoaded() {

          resolve();
        }).catch(function onError() {

          reject();
        });
      });

      /*System.import(futureState.src).then(loaded => {
        var newModule = loaded;
        if (!loaded.name) {
          var key = Object.keys(loaded);
          newModule = loaded[key[0]];
        }

        $ocLazyLoad.load(newModule).then(function onLoaded() {
          def.resolve();
        }, function() {
          console.log('error loading: ' + loaded.name);
        });
      });*/
    }]);

    futureRoutes.forEach(function iterator(aFutureRoute) {

      $futureStateProvider.futureState(aFutureRoute);
    });
  }];

  return RouterConfig;
};

export default routing;
