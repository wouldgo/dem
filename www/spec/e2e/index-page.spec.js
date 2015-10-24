/*global describe,it,browser,element,by*/
describe('dem homepage', function testScenario() {
  'use strict';

  var waitForUrlToChangeTo = function waitForUrlToChangeTo(urlRegex) {

    return browser.getCurrentUrl().then(function storeCurrentUrl() {

    }).then(function waitChangeTo() {

      return browser.wait(function onChangeTo() {

        return browser.getCurrentUrl().then(function compareCurrentUrl(url) {

          return urlRegex.test(url);
        });
      });
    });
  };

  it('should login and move into file-submit view', function testCase() {
    browser.get('http://localhost:8100/');

    element(by.model('identificationCtrl.user.email')).sendKeys('asd@asd.asd');
    element(by.css('body > div.layout-padding.ng-scope.layout-align-center-start.layout-row.flex > md-content > md-card > md-card-content > form > button > span')).click();

    waitForUrlToChangeTo(/file-submit/);
  });
});
