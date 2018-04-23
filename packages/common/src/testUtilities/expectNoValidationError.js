module.exports = function expectNoValidationError(validationResult) {
  if (validationResult) {
    if (validationResult.parameterErrors) {
      expect(JSON.stringify(validationResult.parameterErrors, null, 2)).toBe(
        null
      )
    } else {
      expect(validationResult).toBeFalsy()
    }
  }

  expect(validationResult).toBe(null)
}
