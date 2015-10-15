/*global module*/
(function testing(module) {
  'use strict';

  var MockObjectId = function MockObjectId(value) {

    if (value) {

      this.value = value;
    }
  };

  MockObjectId.prototype.toHexString = function toHexString() {
    return this.value;
  };

  module.exports = MockObjectId;
}(module));
