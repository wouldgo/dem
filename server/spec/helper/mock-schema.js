/*global module*/
(function testing(module) {
  'use strict';

  module.exports = function mockedSchema(schemaMap) {

    if (!schemaMap) {

      throw new Error('You must provide a schema');
    }

    return schemaMap;
  };
}(module));
