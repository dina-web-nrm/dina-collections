'use strict';

describe('buildTests/testImports', function () {
  it('models.json imported without error', function () {
    return expect(require('../../../dist/models.json')).toBeTruthy();
  });

  it('openApi.json imported without error', function () {
    return expect(require('../../../dist/openApi.json')).toBeTruthy();
  });
});