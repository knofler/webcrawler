'use strict';

describe('Controller: CsvCtrl', function () {

  // load the controller's module
  beforeEach(module('webcrawler'));

  var CsvCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CsvCtrl = $controller('CsvCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
