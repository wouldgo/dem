import angular from 'angular';
import 'ng-file-upload';
import 'angular-filter';
import {FileSubmitController} from './controller.js';
import fileSubmitTemplate from 'dist/file-submit/file-submit.tpl.js';
import {FileSubmitFactory} from './service.js';

const routeConf = /*@ngInject*/ function routeConf($stateProvider) {
  'use strict';

  $stateProvider.state('file-submit', {
    'url': '/file-submit',
    'templateUrl': fileSubmitTemplate.name,
    'controller': FileSubmitController,
    'controllerAs': 'fileSubmitCtrl',
    'onEnter': /*@ngInject*/ function onEnter($state, IdentificationService) {

      if (!IdentificationService.isUserLoggedIn()) {

        $state.go('identification');
      }
    }
  });
};

export default angular.module('file-submit', [
    'ngFileUpload',
    'angular.filter',
    fileSubmitTemplate.name
  ])
  .config(routeConf)
  .factory('FileSubmitService', FileSubmitFactory);
