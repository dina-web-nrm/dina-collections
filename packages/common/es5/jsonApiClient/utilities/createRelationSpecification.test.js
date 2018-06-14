'use strict';

var createRelationSpecification = require('./createRelationSpecification');

describe('jsonApiClient/utilities/createRelationSpecification', function () {
  test('returns empty object if no relationships or include specified', function () {
    var testValue = createRelationSpecification({
      include: undefined,
      relationships: undefined
    });
    var expectedResult = {};

    expect(testValue).toEqual(expectedResult);
  });

  test('throws if include contains something not in relationships', function () {
    var testValue = function testValue() {
      return createRelationSpecification({
        include: ['agent'],
        relationships: undefined
      });
    };

    expect(testValue).toThrow('Cannot include resource not specificed in relationships');
  });

  test('does not throw if include contains something and relationships is all', function () {
    var testValue = function testValue() {
      return createRelationSpecification({
        include: ['agent'],
        relationships: ['all']
      });
    };

    expect(testValue).not.toThrow('Cannot include resource not specificed in relationships');
  });

  test('returns relationship key with value false, if not included', function () {
    var testValue = createRelationSpecification({
      include: undefined,
      relationships: ['agent', 'user']
    });

    var expectedResult = {
      agent: false,
      user: false
    };

    expect(testValue).toEqual(expectedResult);
  });

  test('returns relationship key with value true, if included', function () {
    var testValue = createRelationSpecification({
      include: ['agent'],
      relationships: ['agent', 'user']
    });

    var expectedResult = {
      agent: true,
      user: false
    };

    expect(testValue).toEqual(expectedResult);
  });
});