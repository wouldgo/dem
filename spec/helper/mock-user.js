/*global module*/
(function testing(module) {
  'use strict';

  module.exports = function exportingFunction(mockedUser, MockObjectId) {

    var theSchema
      , modelRegistration = function ModelRegistration(user) {

        if (user) {
          var usersKeys = Object.keys(user);

          this.user = user;
          if (usersKeys.indexOf('_id') < 0) {

            /*jscs: disable disallowDanglingUnderscores*/
            /*eslint-disable no-underscore-dangle*/
            this.user._id = new MockObjectId(Math.ceil(Math.random() * 10000));
            /*jscs: enable disallowDanglingUnderscores*/
            /*eslint-enable no-underscore-dangle*/
          }
        }
      }
    , mockedDb = {
        'model': function model(modelName, schema) {

          theSchema = schema;
          return modelRegistration;
        }
      };

    modelRegistration.findOne = function findOne(query, cb) {

      if (query &&
        (query.email === mockedUser.email ||
        /*jscs: disable disallowDanglingUnderscores*/
        /*eslint-disable no-underscore-dangle*/
        query._id && query._id.toHexString() === mockedUser._id.toHexString())) {
        /*jscs: enable disallowDanglingUnderscores*/
        /*eslint-enable no-underscore-dangle*/
        var schemaVariables = Object.keys(theSchema)
          , mockObject = {};

        schemaVariables.forEach(function iterator(anElement) {

          if (query[anElement]) {

            mockObject[anElement] = query[anElement];
          } else {

            mockObject[anElement] = mockedUser[anElement];
          }
        });

        /*jscs: disable disallowDanglingUnderscores*/
        /*eslint-disable no-underscore-dangle*/
        mockObject._id = mockedUser._id;
        /*jscs: enable disallowDanglingUnderscores*/
        /*eslint-enable no-underscore-dangle*/
        cb(null, mockObject);
      } else {

        cb(null, undefined);
      }
    };

    modelRegistration.getById = modelRegistration.findOne;

    modelRegistration.update = function update(query, op, cb) {

      if (query &&
        /*jscs: disable disallowDanglingUnderscores*/
        /*eslint-disable no-underscore-dangle*/
        mockedUser._id.toHexString() === query._id.toHexString() &&
        /*jscs: enable disallowDanglingUnderscores*/
        /*eslint-enable no-underscore-dangle*/
        op &&
        op.$set) {

        cb(null, op.$set);
      } else {

        cb('fail');
      }
    };

    modelRegistration.remove = function remove(query, cb) {

      /*jscs: disable disallowDanglingUnderscores*/
      /*eslint-disable no-underscore-dangle*/
      if (query._id &&
        mockedUser._id.toHexString() === query._id) {
        /*jscs: enable disallowDanglingUnderscores*/
        /*eslint-enable no-underscore-dangle*/

        cb(null, 'done');
      } else {

        cb('fail');
      }
    };

    modelRegistration.prototype.save = function save(cb) {

      cb(null, this.user);
    };

    return mockedDb;
  };
}(module));
