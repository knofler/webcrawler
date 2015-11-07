'use strict';

describe('Directive: dndChart', function () {

  // load the directive's module and view
  beforeEach(module('webcrawler'));
  beforeEach(module('app/directive/dndChart/dndChart.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<dnd-chart></dnd-chart>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the dndChart directive');
  }));
});