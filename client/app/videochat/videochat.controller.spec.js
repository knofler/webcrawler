'use strict';

describe('Controller: VideochatCtrl', function () {

  // load the controller's module
  beforeEach(module('webcrawler'));

  var VideochatCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    VideochatCtrl = $controller('VideochatCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
