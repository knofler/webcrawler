'use strict';

describe('Service: Display', function () {

  // load the service's module
  beforeEach(module('webcrawler'));

  // instantiate service
  var Display;
  beforeEach(inject(function (_Display_) {
    Display = _Display_;
  }));

  it('should do something', function () {
    expect(!!Display).toBe(true);
  });

});
