import angular from 'angular';

export default angular.module('values', [])
  .constant('config', {
    'application': {
      'shortName': 'vDEM',
      'name': 'Visual DEM/DTM',
      'toast': {
        'hideTimeout': 3000,
        'position': 'bottom right'
      }
    },
    'http': {
      'address': 'http://localhost:3000',
      'malformedResponse': 'Malformed response'
    },
    'ws': {
      'address': 'ws://localhost:9876'
    }
  });
