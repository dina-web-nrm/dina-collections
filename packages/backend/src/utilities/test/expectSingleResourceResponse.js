module.exports = function expectSingleResourceResponse({
  expectedId,
  expectedType,
  relationships,
  response,
}) {
  expect(response).toBeTruthy()
  expect(response.data).toBeTruthy()
  expect(response.data.type).toBe(expectedType)
  expect(response.data.attributes).toBeTruthy()
  if (expectedId !== undefined) {
    expect(response.data.id).toBe(expectedId)
  }
  if (relationships !== undefined) {
    if (relationships) {
      expect(response.data.relationships).toEqual(relationships)
    } else {
      expect(response.data.relationships).toBeFalsy()
    }
  }
}
