/*global document*/
import angular from 'angular';
import $ from 'jquery';
import dem from './dem';

const documentReference = $(document);

angular.bootstrap(documentReference, [
  dem
]);
