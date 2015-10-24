/*global setTimeout,describe,it,expect,beforeEach,module,inject*/
import angular from 'angular';
import 'angular-mocks';
import 'spec/fixtures/mock-ui-router.js';
import dataVisualization from '../src/data-visualization/index.js';

describe('identification-module-identificationFactory', () => {
  'use strict';

  let $compile
    , $rootScope
    , mockSectionGraphData = {
      'currentRow': 0,
      'points': [
        [0, 0, 1],
        [0, 1, 2],
        [1, 0, 3],
        [1, 1, 4]
      ]
    }
    , expectedMockedSectionGraph = 'd="M0,240L-22,160L-44,80L-66,0"'
    , expectedSecondMockedSectionGraph = 'd="M0,120L-22,180L-44,240L-66,0"'
    , secondMockSectionGraphData = {
      'currentRow': 1,
      'points': [
        [0, 0, 6],
        [0, 1, 5],
        [1, 0, 4],
        [1, 1, 8]
      ]
    };

  beforeEach(() => {

    angular.module('data-visualization-mock-module', [
      'state-mock',
      dataVisualization.name
    ]);
  });
  beforeEach(module('data-visualization-mock-module'));
  beforeEach(inject(($injector) => {

    $compile = $injector.get('$compile');
    $rootScope = $injector.get('$rootScope');
  }));

  it('should be put in page section graph directive', () => {
    let element = $compile('<div dem-section></div>')($rootScope);

    $rootScope.$digest();
    expect(element).toBeDefined();
    expect(element.html()).toEqual('');
  });

  it('should be populate by comunicator data event', () => {
    let element = $compile('<div dem-section></div>')($rootScope);

    $rootScope.$digest();
    $rootScope.$emit('dem:new-points', mockSectionGraphData);

    expect(element.html()).toContain(expectedMockedSectionGraph);
  });

  it('should be populate by comunicator data event twice', (done) => {
    let element = $compile('<div dem-section></div>')($rootScope);

    $rootScope.$digest();
    $rootScope.$emit('dem:new-points', mockSectionGraphData);

    expect(element.html()).toContain(expectedMockedSectionGraph);
    $rootScope.$emit('dem:new-points', secondMockSectionGraphData);
    setTimeout(() => {

      expect(element.html()).toContain(expectedSecondMockedSectionGraph);
      done();
    }, 1500);
  });
});
