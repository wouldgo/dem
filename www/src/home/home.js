import angular from 'angular';
import 'ng-file-upload';
import 'angular-filter';
import {HomeController} from './home.controller.js';
import homeTemplate from 'dist/home/home.tpl';

const configurationModule = ['$stateProvider', function configurationModule($stateProvider) {
  'use strict';

  $stateProvider.state('home', {
    'url': '/',
    'templateUrl': homeTemplate.name,
    'controller': HomeController,
    'controllerAs': 'homeCtrl'
  });
}];

export default angular
  .module('home', [
    'ngFileUpload',
    'angular.filter',
    homeTemplate.name
  ])
  .config(configurationModule);
