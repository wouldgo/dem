import angular from 'angular';
import homeCtrl from './home.controller.js';
import homeTemplate from './home.tpl';

const configurationModule = ['$stateProvider', function configurationModule($stateProvider) {
  'use strict';

  $stateProvider.state('home', {
    'url': '/',
    'template': homeTemplate.name,
    'controller': homeCtrl,
    'controllerAs': 'homeCtrl'
  });
}];

export default angular
  .module('home', [])
  .config(configurationModule);
