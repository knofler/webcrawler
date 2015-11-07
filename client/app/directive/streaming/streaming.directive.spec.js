'use strict';

describe('Directive: streaming', function () {

  // load the directive's module and view
  beforeEach(module('webcrawler'));
  beforeEach(module('app/directive/streaming/streaming.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<streaming></streaming>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the streaming directive');
  }));
});