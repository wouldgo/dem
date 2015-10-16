/*global System*/
import 'ui-router-extras';

const routing = function routing(module, futureRoutes) {
  'use strict';

  module.requires.push('ct.ui.router.extras.future');
  var RouterConfig = /*@ngInject*/ function RouterConfig($stateProvider, $futureStateProvider) {

    var stateFactory = /*@ngInject*/ function stateFactory($q, $ocLazyLoad, futureState) {

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
    };

    $futureStateProvider.stateFactory('load', stateFactory);
    futureRoutes.forEach((aFutureRoute) => {

      $futureStateProvider.futureState(aFutureRoute);
    });
  };

  return RouterConfig;
};

export default routing;
