'use strict';

var buildOperationId = require('./index');

describe('lib/services/operationFactory/typeFactories/utilities/buildOperationId', function () {
  it('returns operationId from resource and operationType', function () {
    var operationType = 'getOne';
    var resource = 'specimen';
    var testValue = buildOperationId({ operationType: operationType, resource: resource });
    var expectedResult = 'specimenGetOne';

    expect(testValue).toEqual(expectedResult);
  });

  it('returns operationId from resource, operationType and relationKey', function () {
    var operationType = 'getRelationship';
    var relationKey = 'physicalObjects';
    var resource = 'storageLocation';

    var testValue = buildOperationId({ operationType: operationType, relationKey: relationKey, resource: resource });
    var expectedResult = 'storageLocationGetRelationshipPhysicalObjects';

    expect(testValue).toEqual(expectedResult);
  });
});