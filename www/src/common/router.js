/*global System*/
import 'ui-router-extras';
import routes from './routes.json!';

const stateFactory = /*@ngInject*/ function stateFactory($rootScope, $q, $ocLazyLoad, futureState) {
  'use strict';

  $rootScope.$emit('router:changing', {
    'to': futureState.stateName
  });
  return $q((resolve, reject) => {

    System.import(futureState.src).then(loaded => {
      var newModule = loaded;

      if (!loaded.name) {
        let key = Object.keys(loaded);

        newModule = loaded[key[0]];
      }

      $ocLazyLoad.load(newModule).then(function onLoaded() {

        resolve();
        $rootScope.$emit('router:changed', {
          'to': futureState.stateName
        });
      }).catch(function onError(error) {

        reject(error);
        $rootScope.$emit('router:error', {
          'to': futureState.stateName,
          'error': error
        });
      });
    });
  });
};

export let router = function router(module) {
  'use strict';

  module.requires.push('ct.ui.router.extras.future');
  var RouterConfig = /*@ngInject*/ function RouterConfig($stateProvider, $futureStateProvider) {

    $futureStateProvider.stateFactory('load', stateFactory);
    routes.forEach((aFutureRoute) => {

      $futureStateProvider.futureState(aFutureRoute);
    });
  };

  return RouterConfig;
};

/*eslint-disable one-var*/
export let stateEventsHandler = /*@ngInject*/ function stateEventsHandler($log, $rootScope, $state) {
  /*eslint-enable one-var*/
  'use strict';

  let manageLoadingError = function manageLoadingError(error) {

    $log.debug(error);
    $state.go('identification'); //TODO put a notification of error
  }
    , unregisterChanging = $rootScope.$on('router:changing', (eventInfos, payload) => {

      if (payload &&
        payload.to) {

        $log.debug(`Changing to ${payload.to}`);
        $rootScope.loadingState = true;
      }
    })
    , unregisterChanged = $rootScope.$on('router:changed', (eventInfos, payload) => {

      if (payload &&
        payload.to) {

        $log.debug(`Changed to ${payload.to}`);
        $rootScope.loadingState = false;
      }
    })
    , unregisterChangeError = $rootScope.$on('router:error', (eventInfos, payload) => {

      if (payload &&
        payload.to &&
        payload.error) {

        $log.debug(`Changing to ${payload.to} fails due to ${payload.erro}`);
        $rootScope.loadingState = false;
        manageLoadingError(payload.error);
      }
    })
    , unregisterStateChangeError = $rootScope.$on('$stateChangeError', (eventInfos, toState, toParams, fromState, fromParams, error) => {

      $log.error(`State changing from ${fromState.name} to ${toState.name} encounter this problem: ${error}`);
      manageLoadingError(error);
    });

  $rootScope.$on('$destroy', () => {

    unregisterChanging();
    unregisterChanged();
    unregisterChangeError();
    unregisterStateChangeError();
  });
};
