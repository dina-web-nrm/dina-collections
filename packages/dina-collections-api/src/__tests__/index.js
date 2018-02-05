/* eslint-disable global-require */

if (!process.env.API_TESTS) {
  it('Not running api tests when API_TESTS not set', () => {
    expect(1).toBe(1)
  })
} else {
  describe('Endpoint tests', () => {
    require('../tests/collections/individualGroup')
    require('../tests/collections/curatedLocality')
  })
}
