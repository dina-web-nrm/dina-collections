const UNEXPECTED_SUCCESS = 'Call successful but should have failed'

module.exports = function expectError400(promise) {
  return promise
    .then(() => {
      throw new Error(UNEXPECTED_SUCCESS)
    })
    .catch(err => {
      expect(err.message).not.toBe(UNEXPECTED_SUCCESS)
      expect(err.status).toBe(400)
    })
}
