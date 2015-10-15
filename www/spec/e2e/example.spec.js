/*global describe,it,expect,browser,element,by*/
describe('angularjs homepage todo list', function testScenario() {
  'use strict';

  it('should add a todo', function testCase() {
    browser.get('https://angularjs.org');

    element(by.model('todoList.todoText')).sendKeys('write first protractor test');
    element(by.css('[value="add"]')).click();
    var todoList = element.all(by.repeater('todo in todoList.todos'))
      , completedAmount = element.all(by.css('.done-true'));

    expect(todoList.count()).toEqual(3);
    expect(todoList.get(2).getText()).toEqual('write first protractor test');

    // You wrote your first test, cross it off the list
    todoList.get(2).element(by.css('input')).click();
    expect(completedAmount.count()).toEqual(2);
  });
});
