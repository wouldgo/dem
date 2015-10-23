/*global jasmine,describe,it,expect,beforeEach,afterEach,module,inject*/
import angular from 'angular';
import 'angular-mocks';
import 'spec/fixtures/mock-ui-router.js';
import fileSubmit from '../src/file-submit/index.js';

describe('identification-module-identificationFactory', () => {
  'use strict';

  let fileSubmitService
    , $httpBackend
    , config
    , fileDone = {
      'file': '123456789'
    };

  beforeEach(() => {

    angular.module('file-submit-mock-module', [
      'state-mock',
      fileSubmit.name
    ]);
  });
  beforeEach(module('file-submit-mock-module'));
  beforeEach(inject(($injector) => {

    fileSubmitService = $injector.get('FileSubmitService');
    $httpBackend = $injector.get('$httpBackend');
    config = $injector.get('config');

    $httpBackend.when('POST', config.http.address + '/raster')
      .respond(fileDone);
  }));

  afterEach(() => {

    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should be a defined object', () => {

    expect(fileSubmitService).toBeDefined();
  });

  it('should has defined members', () => {

    expect(fileSubmitService)
      .toEqual(jasmine.any(Object));

    expect(Object.keys(fileSubmitService)).toEqual([
      'processUpload']);
  });

  it('should post a file', () => {

    $httpBackend.expect('POST', config.http.address + '/raster')
      .respond(200, fileDone);
    fileSubmitService.processUpload('123456');

    $httpBackend.flush();
  });
});
