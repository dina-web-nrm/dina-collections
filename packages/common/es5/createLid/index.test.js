'use strict';

var createLid = require('./index');

describe('createLid', function () {
  test('creates uuid v4', function () {
    var testValue = createLid();
    var lidRegEx = /\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/;

    expect(testValue).toMatch(lidRegEx);
  });
});