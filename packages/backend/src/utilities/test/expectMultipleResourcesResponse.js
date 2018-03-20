module.exports = function verifyMultipleResourcesResponse({
  expectedLength,
  expectedType,
  expectLength,
  response,
}) {
  expect(response).toBeTruthy()
  expect(response.data).toBeTruthy()
  expect(Array.isArray(response.data)).toBe(true)
  if (expectedLength !== undefined) {
    expect(response.data.length).toBe(expectedLength)
  }

  if (expectLength) {
    expect(response.data.length > 0).toBe(true)
  }

  if (response.data.length) {
    response.data.forEach(item => {
      expect(item.id).toBeTruthy()
      expect(item.type).toBe(expectedType)
    })
  }
}
