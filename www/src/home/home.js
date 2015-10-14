import angular from 'angular';
import homeCtrl from './home.controller.js';
import homeTemplate from 'dist/home/home.tpl';

const configurationModule = ['$stateProvider', function configurationModule($stateProvider) {
  'use strict';

  $stateProvider.state('home', {
    'url': '/',
    'templateUrl': homeTemplate.name,
    'controller': homeCtrl,
    'controllerAs': 'homeCtrl'
  });
}];

export default angular
  .module('home', [homeTemplate.name])
  .config(configurationModule);
