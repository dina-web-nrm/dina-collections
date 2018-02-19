'use strict';

var Ajv = require('ajv');
var openApiSchema = require('./schemas/openApi.json');

var path = require('path');
var read = require('./read');
var build = require('./build');

var _read = read({
  apiBasePath: path.join(__dirname, '../../../api/src'),
  modelBasePath: path.join(__dirname, '../../../models/src')
}),
    apis = _read.apis,
    endpoints = _read.endpoints,
    errors = _read.errors,
    info = _read.info,
    models = _read.models,
    parameters = _read.parameters,
    security = _read.security,
    servers = _read.servers;

var _build = build({
  apis: apis,
  endpoints: endpoints,
  errors: errors,
  info: info,
  models: models,
  parameters: parameters,
  security: security,
  servers: servers
}),
    openApi = _build.openApi;

describe('factories/index', function () {
  describe('openApi', function () {
    var ajv = void 0;
    var validate = void 0;
    beforeEach(function () {
      ajv = Ajv({
        verbose: false });
      validate = ajv.compile(openApiSchema);
    });

    it('passes schema', function () {
      var valid = validate(openApi);
      expect(validate.errors).toBe(null);
      expect(valid).toBeTruthy();
    });
  });
});