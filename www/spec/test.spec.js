/*global describe,it,expect,beforeEach,module,inject*/
import angular from 'angular';
import 'ui-router';
import 'angular-mocks';
import identification from '../src/identification/index.js';

describe('identification-module-identificationFactory', () => {
  'use strict';

  let identificationService
  , onModuleInjection = function onModuleInjection(_identificationService_) {

    identificationService = _identificationService_;
  };


  beforeEach(function beforeEach() {

    angular.module('identification-mock-module', [
      'ui.router',
      identification.name
    ]);
  });

  beforeEach(module('identification-mock-module'));
  beforeEach(inject(onModuleInjection));

  it('should be a defined object', () => {

    expect(identificationService).toBeDefined();
  });

  it('should has defined methods', () => {

    console.info(identificationService);

    expect(identificationService.createAccount).toBeDefined();
    expect(identificationService.deleteAccount).toBeDefined();
    expect(identificationService.getToken).toBeDefined();
    expect(identificationService.isUserLoggedIn).toBeDefined();
  });

  /*it('fails a test', () => {
    expect(1).toBe(0, 'intentionally failing test');
  });*/
});
