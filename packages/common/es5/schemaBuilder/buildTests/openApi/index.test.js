'use strict';

var schemaInterface = require('../../../schemaInterface');
var Ajv = require('ajv');
var openApiSchema = require('../schemas/openApi.json');

var openApiSpec = schemaInterface.getOpenApiSpec();

describe('buildTests/openApi', function () {
  var ajv = void 0;
  var validate = void 0;
  beforeEach(function () {
    ajv = Ajv({
      missingRefs: 'ignore',
      verbose: false });
    validate = ajv.compile(openApiSchema);
  });

  it('passes schema', function () {
    var valid = validate(openApiSpec);
    expect(validate.errors).toBe(null);
    expect(valid).toBeTruthy();
  });
});