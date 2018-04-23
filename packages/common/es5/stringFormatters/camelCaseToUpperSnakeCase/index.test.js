'use strict';

var camelCaseToUpperSnakeCase = require('./index');

describe('stringFormatting/camelCaseToUpperSnakeCase', function () {
  it('returns input if falsy', function () {
    expect(camelCaseToUpperSnakeCase()).toBeFalsy();
    expect(camelCaseToUpperSnakeCase('')).toBeFalsy();
    expect(camelCaseToUpperSnakeCase(0)).toBeFalsy();
    expect(camelCaseToUpperSnakeCase(false)).toBeFalsy();
    expect(camelCaseToUpperSnakeCase(null)).toBeFalsy();
  });
  it('Turns camelCase into CAMEL_CASE', function () {
    expect(camelCaseToUpperSnakeCase('camelCase')).toBe('CAMEL_CASE');
  });
});