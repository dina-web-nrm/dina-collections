'use strict';

var createQueryString = require('./createQueryString');

describe('apiClient/preProcess/createQueryString', function () {
  it('returns query string', function () {
    var queryParameters = {
      email: 'test@email.co',
      password: undefined,
      token: 'secret'
    };

    var expectedResult = 'email=test@email.co&token=secret';

    expect(createQueryString(queryParameters)).toEqual(expectedResult);
  });
});