/* eslint-disable global-require */

describe('buildTests/testImports', () => {
  it('models.json imported without error', () => {
    return expect(
      require('../../../dist/schemas/modelVersions/current/models.json')
    ).toBeTruthy()
  })

  it('openApi.json imported without error', () => {
    return expect(
      require('../../../dist/schemas/apiVersions/current/openApi.json')
    ).toBeTruthy()
  })
})
