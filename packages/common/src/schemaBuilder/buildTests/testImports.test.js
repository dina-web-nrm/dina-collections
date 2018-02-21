/* eslint-disable global-require */

describe('buildTests/testImports', () => {
  it('models.json imported without error', () => {
    return expect(require('../../../dist/models.json')).toBeTruthy()
  })

  it('openApi.json imported without error', () => {
    return expect(require('../../../dist/openApi.json')).toBeTruthy()
  })
})
