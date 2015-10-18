import angular from 'angular';

export default angular.module('values', [])
  .constant('config', {
    'application': {
      'shortName': 'vDEM',
      'name': 'Visual DEM/DTM'
    },
    'http': {
      'address': 'http://localhost:8100/api'
    },
    'ws': {
      'address': 'ws://localhost:9876'
    }
  });
