import angular from 'angular';
import homeCtrl from './home.controller';
import homeTemplate from './home.tpl';

const configurationModule = ['$stateProvider', function configurationModule($stateProvider) {
  'use strict';

  $stateProvider.state('admin', {
    'url': '/home',
    'templateUrl': homeTemplate.name,
    'controller': homeCtrl,
    'controllerAs': 'homeCtrl'
  });
}];

export default angular
  .module('home', [
    homeTemplate.name
  ])
  .config(configurationModule);
