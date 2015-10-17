/*eslint-disable one-var*/
export const authService = /*@ngInject*/ function authService($rootScope, $http, $q, config, Comunicator, $log) {
  /*eslint-enable one-var*/
  'use strict';

  let createAccount = function createAccount(email) {

    return $q((resolve, reject) => {

      if (email) {

        $http({
          'method': 'GET',
          'url': config.http.address + '/ident',
          'data': {
            'email': email
          }
        }).then((response) => {

          if (response &&
            response.data) {

            $log.info(response.data); //TODO continue here
          } else {

            reject('Malformed response');
          }
        }).catch((error) => {

          reject(error);
        });
      } else {

        reject('No email provided');
      }
    });
  }
  , getToken = function getToken() {

    return $q((resolve, reject) => {

      if ($rootScope.userIdentifier) {

        $http({
          'method': 'GET',
          'url': config.http.address + '/ident',
          'params': {
            'identifier': $rootScope.userIdentifier
          }
        }).then((response) => {

          if (response &&
            response.data) {

            $log.info(response.data); //TODO continue here
          } else {

            reject('Malformed response');
          }
        }).catch((error) => {

          reject(error);
        });
      } else {

        reject('There is no user identifier');
      }
    });
  }
  , deleteAccount = function deleteAccount() {

    return $q((resolve, reject) => {

      if ($rootScope.userIdentifier) {

        $http({
          'method': 'DELETE',
          'url': config.http.address + '/ident',
          'params': {
            'identifier': $rootScope.userIdentifier
          }
        }).then(() => {

          resolve();
        }).catch((error) => {

          reject(error);
        });
      } else {

        reject('There is no user identifier');
      }
    });
  };

  return {
    createAccount,
    getToken,
    deleteAccount
  };
};

/*eslint-disable one-var*/
export const userSettings = /*@ngInject*/ function userSettings($rootScope, localStorageService, Comunicator) {
  /*eslint-enable one-var*/
  'use strict';

  let oldUserIdentifier = localStorageService.get('userIdentifier')
    , oldJwtToken = localStorageService.get('jwtToken')
    , unregisterUserIdentifierBind = localStorageService.bind($rootScope, 'userIdentifier')
    , unregisterUserJwtTokenBind = localStorageService.bind($rootScope, 'jwtToken')
    , unregisterUserLogged = $rootScope.$on('identification:user-login', (eventInfos, payload) => {

      if (payload &&
        payload.userIdentifier &&
        payload.jwtToken) {

        $rootScope.userIdentifier = payload.userIdentifier;
        $rootScope.jwtToken = payload.jwtToken;
        Comunicator.then((theComunicator) => {

          theComunicator.userIsPresent($rootScope.userIdentifier, $rootScope.jwtToken);
        });
      } else {

        throw new Error('Event identification:user-login with incorrect payload');
      }
    });

  if (oldUserIdentifier === null) {

    $rootScope.userIdentifier = undefined;
  } else {

    $rootScope.userIdentifier = oldUserIdentifier;
  }

  if (oldJwtToken === null) {

    $rootScope.jwtToken = undefined;
  } else {

    $rootScope.jwtToken = oldJwtToken;
  }

  if ($rootScope.userIdentifier &&
    $rootScope.jwtToken) {

    $rootScope.$emit('identification:user-login', {
      'userIdentifier': $rootScope.userIdentifier,
      'jwtToken': $rootScope.jwtToken
    });
  }

  $rootScope.$on('$destroy', () => {

    unregisterUserIdentifierBind();
    unregisterUserJwtTokenBind();
    unregisterUserLogged();
  });
};
