'use strict';

describe('Controller: MonadCtrl', function () {

  // load the controller's module
  beforeEach(module('webcrawler'));

  var MonadCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MonadCtrl = $controller('MonadCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
