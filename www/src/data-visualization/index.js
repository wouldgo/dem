import angular from 'angular';
import 'three';
import 'angular-filter';
import {DataVisualizationController} from './controller.js';
import dataVisualizationTemplate from 'dist/data-visualization/data-visualization.tpl.js';

const routeConf = /*@ngInject*/ function routeConf($stateProvider) {
  'use strict';

  $stateProvider.state('data-visualization', {
    'url': '/data-visualization',
    'templateUrl': dataVisualizationTemplate.name,
    'controller': DataVisualizationController,
    'controllerAs': 'dataVisualCtrl',
    'onEnter': /*@ngInject*/ function onEnter($state, IdentificationService) {

      if (!IdentificationService.isUserLoggedIn()) {

        $state.go('identification');
      }
    }
  });
};

export default angular.module('data-visualization', [
    'angular.filter',
    dataVisualizationTemplate.name
  ])
  .config(routeConf);
