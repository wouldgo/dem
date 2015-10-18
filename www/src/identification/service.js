/*eslint-disable one-var*/
export const identificationFactory = /*@ngInject*/ function identificationFactory($rootScope, $http, $q, config) {
  /*eslint-enable one-var*/
  'use strict';

  let createAccount = function createAccount(email) {

    return $q((resolve, reject) => {

      if (email) {

        $http({
          'method': 'POST',
          'url': config.http.address + '/ident',
          'data': {
            'email': email
          }
        }).then((response) => {

          if (response &&
            response.data &&
            response.data.id &&
            response.data.token) {

            $rootScope.$emit('identification:user-login', {
              'userIdentifier': response.data.id,
              'jwtToken': response.data.token
            });
            resolve(email);
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

            $rootScope.$emit('identification:user-logout', {
              'userIdentifier': $rootScope.userIdentifier
            });
            resolve();
          }).catch((error) => {

            reject(error);
          });
        } else {

          reject('There is no user identifier');
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
              response.data &&
              response.data.token) {

              $rootScope.$emit('identification:user-login', {
                'userIdentifier': response.data.id,
                'jwtToken': response.data.token
              });
              resolve();
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
    , isUserLoggedIn = function isUserLoggedIn() {

      return $rootScope.userIdentifier && $rootScope.jwtToken;
    };

  return {
    createAccount,
    deleteAccount,
    getToken,
    isUserLoggedIn
  };
};

/*eslint-disable one-var*/
export const userSettings = /*@ngInject*/ function userSettings($log, $rootScope, localStorageService, Comunicator, IdentificationService, $http) {
  /*eslint-enable one-var*/
  'use strict';

  let oldUserIdentifier = localStorageService.get('userIdentifier')
    , oldJwtToken = localStorageService.get('jwtToken')
    , unregisterUserIdentifierBind = localStorageService.bind($rootScope, 'userIdentifier')
    , unregisterUserJwtTokenBind = localStorageService.bind($rootScope, 'jwtToken')
    , unregisterUserGetToken = $rootScope.$on('identification:user-get-token', (eventInfos, payload) => {

      IdentificationService.getToken().then(() => {

        return $http(payload);
      }).then((response) => {

        $rootScope.$emit('identification:response-resolved', {
          'request': payload,
          'response': response
        });
      });
    })
    , unregisterUserLogged = $rootScope.$on('identification:user-login', (eventInfos, payload) => {

      if (payload &&
        payload.userIdentifier &&
        payload.jwtToken) {

        $rootScope.userIdentifier = payload.userIdentifier;
        $rootScope.jwtToken = payload.jwtToken;
        Comunicator.then((theComunicator) => {

          if (!theComunicator.whoAmI() ||
            $rootScope.userIdentifier !== theComunicator.whoAmI()) {

            theComunicator.userIsPresent($rootScope.userIdentifier, $rootScope.jwtToken);
          }
        });
      } else {

        throw new Error('Event identification:user-login with incorrect payload');
      }
    })
    , unregisterUserLoggedOut = $rootScope.$on('identification:user-logout', (eventInfos, payload) => {

      if (payload &&
        payload.userIdentifier) {

        $rootScope.userIdentifier = undefined;
        $rootScope.jwtToken = undefined;
        Comunicator.then((theComunicator) => {

          theComunicator.exit();
        });
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

    unregisterUserGetToken();
    unregisterUserIdentifierBind();
    unregisterUserJwtTokenBind();
    unregisterUserLogged();
    unregisterUserLoggedOut();
  });
};
