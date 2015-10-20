import angular from 'angular';
import 'three';
import 'angular-filter';
import {DataVisualizationController} from './controller.js';
import dataVisualizationTemplate from 'dist/data-visualization/data-visualization.tpl.js';
import {threejsDirective} from './directive.js';

const routeConf = /*@ngInject*/ function routeConf($stateProvider) {
  'use strict';

  $stateProvider.state('data-visualization', {
    'url': '/data-visualization',
    'params': {
      'max-points': undefined
    },
    'templateUrl': dataVisualizationTemplate.name,
    'controller': DataVisualizationController,
    'controllerAs': 'dataVisualCtrl',
    'onEnter': /*@ngInject*/ function onEnter($state, $stateParams, IdentificationService) {

      if (!IdentificationService.isUserLoggedIn()) {

        $state.go('identification');
      }

      if (!$stateParams['max-points']) {

        $state.go('file-submit');
      }
    }
  });
};

export default angular.module('data-visualization', [
    'angular.filter',
    dataVisualizationTemplate.name
  ])
  .config(routeConf)
  .directive('demThree', threejsDirective);
