const config = require('../../apps/core/config')

module.exports = function dbDescribe(testName, ...rest) {
  if (config.test.runDbTests) {
    return describe(testName, ...rest)
  }

  return describe(testName, () => {
    it('Does not run when API_TESTS not set to true', () => {
      expect(1).toBe(1)
    })
  })
}
