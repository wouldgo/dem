import angular from 'angular';
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
  .module('home', [homeTemplate.name])
  .config(configurationModule);
