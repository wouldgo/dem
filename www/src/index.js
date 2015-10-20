/*global document*/
import angular from 'angular';
import mainModule from './main/index.js';

angular.element(document).ready(() => {
  'use strict';

  angular.element('.no-javascript').removeClass('no-javascript');
  angular.element('#options-fab-menu').removeClass('fab-loading-phase');
  angular.bootstrap(document, [
    mainModule.name
  ], {
    'strictDi': true
  });
});
