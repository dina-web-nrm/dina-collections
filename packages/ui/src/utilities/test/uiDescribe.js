import config from 'config'

module.exports = function uiDescribe(testName, ...rest) {
  if (config.testUi) {
    return describe(testName, ...rest)
  }

  return describe(testName, () => {
    it('Does not run when when REACT_APP_TEST_UI === false', () => {
      expect(1).toBe(1)
    })
  })
}
