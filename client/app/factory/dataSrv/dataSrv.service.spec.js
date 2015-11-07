'use strict';

describe('Service: dataSrv', function () {

  // load the service's module
  beforeEach(module('webcrawler'));

  // instantiate service
  var dataSrv;
  beforeEach(inject(function (_dataSrv_) {
    dataSrv = _dataSrv_;
  }));

  it('should do something', function () {
    expect(!!dataSrv).toBe(true);
  });

});
