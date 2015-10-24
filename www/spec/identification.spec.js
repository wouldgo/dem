/*global jasmine,describe,it,expect,spyOn,beforeEach,afterEach,module,inject*/
import angular from 'angular';
import 'angular-mocks';
import 'spec/fixtures/mock-ui-router.js';
import identification from '../src/identification/index.js';

describe('identification-module-identificationFactory', () => {
  'use strict';

  let identificationService
    , $rootScope
    , $httpBackend
    , config
    , createAccountMockResponse = {
      'id': '123a',
      'token': 'token'
    }
    , newToken = 'new-token'
    , getTokenMockResponse = {
      'id': createAccountMockResponse.id,
      'token': newToken
    }
    , deletedMockResponse = {
      'status': 'deleted'
    };

  beforeEach(() => {

    angular.module('identification-mock-module', [
      'state-mock',
      identification.name
    ]);
  });
  beforeEach(module('identification-mock-module', $provide => {

    $provide.value('Comunicator', {
      'then': function promiseTheFunction() {}
    });
  }));
  beforeEach(inject(($injector) => {

    identificationService = $injector.get('IdentificationService');
    $httpBackend = $injector.get('$httpBackend');
    $rootScope = $injector.get('$rootScope');
    config = $injector.get('config');

    $httpBackend.when('POST', config.http.address + '/ident')
      .respond(createAccountMockResponse);

    $httpBackend.when('DELETE', config.http.address + '/ident')
      .respond(deletedMockResponse);

    $httpBackend.when('GET', config.http.address + '/ident')
      .respond(getTokenMockResponse);
  }));

  afterEach(() => {

    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should be a defined object', () => {

    expect(identificationService).toBeDefined();
  });

  it('should has defined members', () => {

    expect(identificationService)
      .toEqual(jasmine.any(Object));

    expect(Object.keys(identificationService)).toEqual([
      'createAccount',
      'deleteAccount',
      'getToken',
      'isUserLoggedIn']);
  });

  it('should creates an account', () => {

    spyOn($rootScope, '$emit');
    $httpBackend.expect('POST', config.http.address + '/ident', {
        'email': 'test@test.test'
      })
      .respond(200, createAccountMockResponse);
    identificationService.createAccount('test@test.test');

    $httpBackend.flush();
    expect($rootScope.$emit).toHaveBeenCalledWith('identification:user-login', {
      'userIdentifier': createAccountMockResponse.id,
      'jwtToken': createAccountMockResponse.token
    });
  });

  it('should deletes an account', () => {

    spyOn($rootScope, '$emit');
    $rootScope.userIdentifier = createAccountMockResponse.id;
    $httpBackend.expect('DELETE')
      .respond(200);
    identificationService.deleteAccount();

    $httpBackend.flush();
    expect($rootScope.$emit).toHaveBeenCalledWith('identification:user-logout', {
      'userIdentifier': createAccountMockResponse.id
    });
  });

  it('should not delete an account', () => {

    spyOn($rootScope, '$emit');
    $rootScope.userIdentifier = 'no-valid-token';
    $httpBackend.expect('DELETE')
      .respond(500);
    identificationService.deleteAccount();

    $httpBackend.flush();
  });

  it('should get a new token', () => {

    spyOn($rootScope, '$emit');
    $rootScope.userIdentifier = createAccountMockResponse.id;
    $httpBackend.expect('GET')
      .respond(200, getTokenMockResponse);
    identificationService.getToken();

    $httpBackend.flush();
    expect($rootScope.$emit).toHaveBeenCalledWith('identification:user-login', {
      'userIdentifier': getTokenMockResponse.id,
      'jwtToken': getTokenMockResponse.token
    });
  });

  it('should not get a new token', () => {

    spyOn($rootScope, '$emit');
    $rootScope.userIdentifier = 'no-valid-token';
    $httpBackend.expect('GET')
      .respond(500);
    identificationService.getToken();

    $httpBackend.flush();
  });

  it('should returns that user is logged in', () => {
    $rootScope.userIdentifier = 'a-value';
    $rootScope.jwtToken = 'a-valid-token';
    let value = identificationService.isUserLoggedIn();

    expect(value).toBeDefined();
  });

  it('should not returns that user is logged in', () => {

    identificationService.isUserLoggedIn();
  });
});
