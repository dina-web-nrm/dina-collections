'use strict';

describe('buildTests/testImports', function () {
  it('models.json imported without error', function () {
    return expect(require('../../../dist/schemas/modelVersions/current/models.json')).toBeTruthy();
  });

  it('openApi.json imported without error', function () {
    return expect(require('../../../dist/schemas/apiVersions/current/openApi.json')).toBeTruthy();
  });
});