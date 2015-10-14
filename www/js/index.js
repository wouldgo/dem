/*global document*/
import angular from 'angular';
import dem from './dem';

angular.element(document).ready(() => {

  'use strict';
  angular.bootstrap(document, [dem.name], {
    'strictDi': true
  });
});
