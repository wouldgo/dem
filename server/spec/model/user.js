/*global module,require*/
(function testing(module, require) {
  'use strict';

  var code = require('code')
    , lab = require('lab').script()
    , describe = lab.describe
    , it = lab.it
    , expect = code.expect
    , MockObjectId = require('../helper/mock-objectId')
    , mockedUser = {
        '_id': new MockObjectId(123),
        'email': 'test@test.test',
        'insertDatetime': Date()
      }
    , mockedDb = require('../helper/mock-user')(mockedUser, MockObjectId)
    , mockedSchema = require('../helper/mock-schema')
    , userModel = require('../../model/user')(mockedDb, mockedSchema, MockObjectId);

  describe('user mongodb model module', function testSuite() {

    it('should gets user by email', function testScenario(done) {

      userModel.getByEmail('test@test.test').then(function onSuccess(element) {

        if (element) {

          expect(element).to.be.an.object();
          expect(element).to.deep.include(mockedUser);
        } else {

          expect(false).to.be.true();
        }
        done();
      }).catch(function onFailure() {

        expect(false).to.be.true();
        done();
      });
    });

    it('should get user by id', function testScenario(done) {

      userModel.getById(123).then(function onSuccess(element) {

        if (element) {

          expect(element).to.be.an.object();
          expect(element).to.deep.include(mockedUser);
          done();
        } else {

          expect(false).to.be.true();
          done();
        }
      }).catch(function onFailure() {

        expect(false).to.be.true();
        done();
      });
    });

    it('should insert new user', function testScenario(done) {

      userModel.insertNew(mockedUser).then(function onSuccess(element) {

        if (element) {

          expect(element).to.be.an.object();
          expect(element).to.deep.include(mockedUser);
          done();
        } else {

          expect(false).to.be.true();
          done();
        }
      }).catch(function onFailure() {

        expect(false).to.be.true();
        done();
      });
    });

    it('should insert new user (2)', function testScenario(done) {
      var aUser = {
        '_id': 456,
        'email': 'one@one.one',
        'insertDatetime': Date()
      };

      userModel.insertNew(aUser).then(function onSuccess(element) {

        if (element) {

          expect(element).to.be.an.object();
          expect(element).to.deep.include(aUser);
          done();
        } else {

          expect(false).to.be.true();
          done();
        }
      }).catch(function onFailure() {

        expect(false).to.be.true();
        done();
      });
    });

    it('should update user by id', function testScenario(done) {

      /*jscs: disable disallowDanglingUnderscores*/
      /*eslint-disable no-underscore-dangle*/
      userModel.updateById(mockedUser._id, mockedUser).then(function onSuccess(element) {
        /*jscs: enable disallowDanglingUnderscores*/
        /*eslint-enable no-underscore-dangle*/

        if (element) {

          expect(element).to.be.an.object();
          expect(element).to.deep.include(mockedUser);
          done();
        } else {

          expect(false).to.be.true();
          done();
        }
      }).catch(function onFailure() {

        expect(false).to.be.true();
        done();
      });
    });

    it('should delete element', function testScenario(done) {

      userModel.dropById(123).then(function onSuccess() {

        expect(true).to.be.true();
        done();
      }).catch(function onFailure() {

        expect(false).to.be.true();
        done();
      });
    });
  });

  describe('user mongodb model wrost case scenarios', function testSuite() {

    it('should get nothing by email', function testScenario(done) {

      userModel.getByEmail('one@one.one').then(function onSuccess() {

        expect(false).to.be.true();
        done();
      }).catch(function onFailure() {

        expect(true).to.be.true();
        done();
      });
    });

    it('should be nothing by id', function testScenario(done) {

      userModel.getById(987).then(function onSuccess() {

        expect(false).to.be.true();
        done();
      }).catch(function onFailure() {

        expect(true).to.be.true();
        done();
      });
    });

    it('should not update anything', function testScenario(done) {

      userModel.updateById(987, {}).then(function onSuccess() {

        expect(false).to.be.true();
      }).catch(function onFailure() {

        expect(true).to.be.true();
        done();
      });
    });

    it('should not delete element', function testScenario(done) {

      userModel.dropById(987).then(function onSuccess() {

        expect(false).to.be.true();
        done();
      }).catch(function onFailure() {

        expect(true).to.be.true();
        done();
      });
    });
  });

  module.exports = {
    'lab': lab
  };
}(module, require));
