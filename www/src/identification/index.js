import angular from 'angular';
import 'angular-local-storage';
import values from '../values/index.js';
import {identificationConf} from './conf.js';
import identificationInterceptor from './interceptor.js';
import {IdentificationController} from './controller.js';
import identificationTemplate from 'dist/identification/identification.tpl.js';
import {userSettings, identificationFactory} from './service.js';

const routeConf = /*@ngInject*/ function routeConf($stateProvider) {
  'use strict';

  $stateProvider.state('identification', {
    'url': '/',
    'templateUrl': identificationTemplate.name,
    'controller': IdentificationController,
    'controllerAs': 'identificationCtrl',
    'onEnter': /*@ngInject*/ function onEnter($state, IdentificationService) {

      if (IdentificationService.isUserLoggedIn()) {

        $state.go('file-submit');
      }
    }
  });
};

export default angular.module('identification', [
    'LocalStorageModule',
    values.name,
    identificationTemplate.name
  ])
  .config(identificationConf)
  .config(routeConf)
  .factory('IdentificationInterceptor', identificationInterceptor)
  .factory('IdentificationService', identificationFactory)
  .controller('IdentificationController', IdentificationController)
  .run(userSettings);
