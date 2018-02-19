'use strict';

var Ajv = require('ajv');
var openApiSchema = require('../schemas/openApi.json');
var openApi = require('../../../../dist/openApi.json');

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
    var valid = validate(openApi);
    expect(validate.errors).toBe(null);
    expect(valid).toBeTruthy();
  });
});