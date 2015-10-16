/*global document*/
import angular from 'angular';
import dem from './dem.js';

angular.element(document).ready(() => {
  'use strict';

  angular.element('.no-javascript').removeClass('no-javascript');
  angular.bootstrap(document, [dem.name], {
    'strictDi': true
  });
});
