const config = require('../../apis/core/config')

module.exports = function apiDescribe(testName, ...rest) {
  if (config.test.runApiTests) {
    return describe(testName, ...rest)
  }

  return describe(testName, () => {
    it('Does not run when API_TESTS not set to true', () => {
      expect(1).toBe(1)
    })
  })
}
