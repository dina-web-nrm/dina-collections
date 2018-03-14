module.exports = function expectNoValidationError(validationResult) {
  if (validationResult) {
    expect(JSON.stringify(validationResult.parameterErrors, null, 2)).toBe(null)
  }

  expect(validationResult).toBe(null)
}
