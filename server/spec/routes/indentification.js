/*global module,require*/
(function withNode(module, require) {
  'use strict';

  var joi = require('joi')
    , boom = require('boom')
    , MockObjectId = require('../helper/mock-objectId')
    , mockedUser = {
        '_id': new MockObjectId(123),
        'email': 'test@test.test',
        'insertDatetime': Date()
      }
    , mockedDb = require('../helper/mock-user')(mockedUser, MockObjectId)
    , mockedSchema = require('../helper/mock-schema')
    , model = {
      'users': require('../../model/user')(mockedDb, mockedSchema, MockObjectId)
    }
    , identification = require('../../identification')(86400, model, joi, boom)
    , code = require('code')
    , lab = require('lab').script()
    , describe = lab.describe
    , it = lab.it
    , expect = code.expect
    , reply = require('../helper/mock-reply');

  describe('identification module', function testSuite() {

    it('should be an object', function testScenario(done) {

      expect(identification).to.be.an.object();
      expect(identification).to.only.include(['routes', 'strategy']);
      done();
    });

    it('should strategy be an object', function testScenario(done) {

      expect(identification.strategy).to.be.an.object();
      expect(identification.strategy).to.only.include(['key', 'validateFunc']);
      done();
    });

    it('should have 3 /ident routes', function testScenario(done) {

      expect(identification.routes).to.be.an.array();
      expect(identification.routes).to.have.length(3);
      identification.routes.forEach(function iterator(anElement) {

        expect(anElement).to.be.an.object();
        expect(anElement).to.only.include(['method', 'path', 'config', 'handler']);
        expect(anElement.method).to.match(/[GET|HEAD|POST|PUT|DELETE|TRACE|OPTIONS|CONNECT|PATCH]/);
        expect(anElement.path).to.equal('/ident');
        expect(anElement.config).to.be.an.object();
        expect(anElement.handler).to.be.a.function();
      });
      done();
    });

    describe('new submission - POST', function group() {
      var postRoute = identification.routes[0];

      it('should handle new user submission', function testScenario(done) {
        var thisReply = reply.bind(this, function onResponse(data) {

          expect(data).to.be.an.object();
          expect(data).to.only.include(['id', 'sessionExpiration', 'token']);
          expect(data.id).to.be.equal(123);
          expect(data.sessionExpiration).to.be.equal(86400);
          expect(data.token).to.be.a.string();
          done();
        });

        expect(postRoute.method).to.equal('POST');
        postRoute.handler({
          'payload': {
            'email': 'test@test.test'
          }
        }, thisReply);
      });

      it('should handle new user submission (2)', function testScenario(done) {
        var thisReply = reply.bind(this, function onResponse(data) {

          expect(data).to.be.an.object();
          expect(data).to.only.include(['id', 'sessionExpiration', 'token']);
          expect(data.sessionExpiration).to.be.equal(86400);
          expect(data.token).to.be.a.string();
          done();
        });

        expect(postRoute.method).to.equal('POST');
        postRoute.handler({
          'payload': {
            'email': 'test1@test.test'
          }
        }, thisReply);
      });
    });

    describe('get submission - GET', function group() {
      var getRoute = identification.routes[1];

      it('should handle existent submission', function testScenario(done) {
        var thisReply = reply.bind(this, function onResponse(data) {

          expect(data).to.be.an.object();
          expect(data).to.only.include(['id', 'sessionExpiration', 'token']);
          expect(data.id).to.be.equal(123);
          expect(data.sessionExpiration).to.be.equal(86400);
          expect(data.token).to.be.a.string();
          done();
        });

        expect(getRoute.method).to.equal('GET');
        getRoute.handler({
          'query': {
            'email': 'test@test.test'
          }
        }, thisReply);
      });

      it('should not handle existent submission', function testScenario(done) {
        var thisReply = reply.bind(this, function onResponse(data) {

          expect(data instanceof Error).to.be.true();
          expect(data.output.statusCode).to.be.equals(401);
          expect(data.output.payload.message).to.be.equals('You must first create an account');
          done();
        });

        expect(getRoute.method).to.be.equal('GET');
        getRoute.handler({
          'query': {
            'email': 'test1@test.test'
          }
        }, thisReply);
      });
    });

    describe('delete submission - DELETE', function group() {
      var deleteRoute = identification.routes[2];

      it('should delete submission', function testScenario(done) {
        var thisReply = reply.bind(this, function onResponse(data) {

          expect(data).to.be.an.object();
          expect(data.status).to.be.equals('deleted');
          done();
        });

        expect(deleteRoute.method).to.be.equals('DELETE');
        deleteRoute.handler({
          'query': {
            'email': 'test@test.test'
          }
        }, thisReply);
      });

      it('should not delete submission', function testScenario(done) {
        var thisReply = reply.bind(this, function onResponse(data) {

          expect(data instanceof Error).to.be.true();
          expect(data.output.statusCode).to.be.equals(422);
          expect(data.output.payload.message).to.be.equals('You must provide an email stored');
          done();
        });

        expect(deleteRoute.method).to.be.equals('DELETE');
        deleteRoute.handler({
          'query': {
            'email': 'test1@test.test'
          }
        }, thisReply);
      });
    });
  });

  module.exports = {
    'lab': lab
  };
}(module, require));
