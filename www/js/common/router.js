/*global System*/
import 'ui-router-extras';

const routing = function routing(module, futureRoutes) {
  'use strict';

  module.requires.push('ct.ui.router.extras.future');
  var RouterConfig = ['$stateProvider', '$futureStateProvider', function RouterConfig($stateProvider, $futureStateProvider) {

    $futureStateProvider.stateFactory('load', ['$q', '$ocLazyLoad', 'futureState', function stateFactory($q, $ocLazyLoad, futureState) {

      return $q((resolve, reject) => {

        System.import(futureState.src).then(loaded => {
          var newModule = loaded;

          if (!loaded.name) {
            let key = Object.keys(loaded);

            newModule = loaded[key[0]];
          }

          $ocLazyLoad.load(newModule).then(function onLoaded() {

            resolve();
          }).catch(function onError() {

            reject();
          });
        });
      });
    }]);

    futureRoutes.forEach((aFutureRoute) => {

      $futureStateProvider.futureState(aFutureRoute);
    });
  }];

  return RouterConfig;
};

export default routing;
