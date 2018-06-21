const config = require('../../apps/test/config')

module.exports = function batchDescribe(testName, ...rest) {
  if (config.test.runBatchTests) {
    return describe(testName, ...rest)
  }

  return describe(testName, () => {
    it('Does not run when BATCH_TESTS not set to true', () => {
      expect(1).toBe(1)
    })
  })
}
