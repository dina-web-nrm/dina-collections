describe('buildTests/testImports', () => {
  it('models.json imported without error', () => {
    return expect(require('../../build/models.json')).toBeTruthy()
  })

  it('openApi.json imported without error', () => {
    return expect(require('../../build/openApi.json')).toBeTruthy()
  })

  it('swagger.json imported without error', () => {
    return expect(require('../../build/swagger.json')).toBeTruthy()
  })
})
