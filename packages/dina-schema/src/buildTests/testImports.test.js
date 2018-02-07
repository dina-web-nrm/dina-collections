describe('buildTests/testImports', () => {
  it('models.json imported without error', () => {
    return expect(require('dina-shared/dist/models.json')).toBeTruthy()
  })

  it('openApi.json imported without error', () => {
    return expect(require('dina-shared/dist/openApi.json')).toBeTruthy()
  })

  it('swagger.json imported without error', () => {
    return expect(require('dina-shared/dist/swagger.json')).toBeTruthy()
  })
})
