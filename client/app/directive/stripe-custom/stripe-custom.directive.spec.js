'use strict';

describe('Directive: stripeCustom', function () {

  // load the directive's module and view
  beforeEach(module('webcrawler'));
  beforeEach(module('app/directive/stripe-custom/stripe-custom.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<stripe-custom></stripe-custom>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the stripeCustom directive');
  }));
});