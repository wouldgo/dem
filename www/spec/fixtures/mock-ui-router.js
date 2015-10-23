/*global window*/
import angular from 'angular';

angular.module('state-mock', [])
  .provider('$state', () => {
    'use strict';

    let getFunction = function getFunction($q) {
      this.expectedTransitions = [];
      this.transitionTo = function transitionTo(stateName) {
        var expectedState
          , deferred
          , promise;

        if (this.expectedTransitions.length > 0) {
          expectedState = this.expectedTransitions.shift();

          if (expectedState !== stateName) {

            throw Error('Expected transition to state: ' + expectedState + ' but transitioned to ' + stateName );
          }
        } else {

          throw Error('No more transitions were expected! Tried to transition to ' + stateName);
        }

        /*eslint-disable*/
        window.console.log('Mock transition to: ' + stateName);
        /*eslint-enable*/
        deferred = $q.defer();
        promise = deferred.promise;
        deferred.resolve();
        return promise;
      };

      this.go = this.transitionTo;
      this.expectTransitionTo = function expectTransitionTo(stateName) {

        this.expectedTransitions.push(stateName);
      };

      this.ensureAllTransitionsHappened = function ensureAllTransitionsHappened() {

        if (this.expectedTransitions.length > 0) {

          throw Error('Not all transitions happened!');
        }
      };
    };

    return {
      'state': function stateMock() {},
      '$get': ['$q', getFunction]
    };
  });
