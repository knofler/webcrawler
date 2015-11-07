'use strict';

describe('Directive: editforms', function () {

  // load the directive's module and view
  beforeEach(module('webcrawler'));
  beforeEach(module('app/directive/editforms/editforms.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<editforms></editforms>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the editforms directive');
  }));
});