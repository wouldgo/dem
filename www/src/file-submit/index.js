import angular from 'angular';
import 'ng-file-upload';
import 'angular-filter';
import {FileSubmitController} from './controller.js';
import fileSubmitTemplate from 'dist/file-submit/file-submit.tpl.js';

const routeConf = /*@ngInject*/ function routeConf($stateProvider) {
  'use strict';

  $stateProvider.state('file-submit', {
    'url': '/file-submit',
    'templateUrl': fileSubmitTemplate.name,
    'controller': FileSubmitController,
    'controllerAs': 'fileSubmitCtrl'
  });
};

export default angular.module('file-submit', [
    'ngFileUpload',
    'angular.filter',
    fileSubmitTemplate.name
  ])
  .config(routeConf);
