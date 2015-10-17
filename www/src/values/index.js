import angular from 'angular';

export default angular.module('values', [])
  .constant('config', {
    'application': {
      'shortName': 'vDEM',
      'name': 'Visual DEM/DTM'
    },
    'http': {
      'address': 'http://127.0.0.1:3000/api'
    },
    'ws': {
      'address': 'ws://127.0.0.1:9876'
    }
  });
