import angular from 'angular';

const rendererCtrl = function rendererCtrl($scope) {
  'use strict';

  $scope.data = 'data';
};

angular.module('dem.renderer')
  .controller('RendererCtrl', ['$scope', rendererCtrl]);

export default 'dem.renderer';
