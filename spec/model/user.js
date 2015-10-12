/*global require*/
(function testing(require) {
  'use strict';

  var code = require('code')
    , lab = require('lab').script()
    , describe = lab.describe
    , it = lab.it
    /*, before = lab.before
    , after = lab.after*/
    , expect = code.expect;

  describe('math', function testSuite() {

    it('returns true when 1 + 1 equals 2', function testScenario(done) {

      expect(1 + 1).to.equal(2);
      done();
    });
  });
}(require));
