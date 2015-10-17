/*global document*/
import angular from 'angular';
import mainModule from './main/index.js';

angular.element(document).ready(() => {
  'use strict';

  angular.element('.no-javascript').removeClass('no-javascript');
  angular.bootstrap(document, [
    mainModule.name
  ], {
    'strictDi': true
  });
});
