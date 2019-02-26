const unitDescribe = require('common/src/testUtilities/unitDescribe')
const validateContentType = require('./validateContentType')

unitDescribe('lib/serviceRouter/middlewares/validateContentType', () => {
  it('Returns null if no content type headers provided', () => {
    const error = validateContentType()
    expect(error).toBe(null)
  })
  it('Returns null if a non json api header provided', () => {
    const error = validateContentType('application/json')
    expect(error).toBe(null)
  })
  it('Returns null if one json api header provided', () => {
    const error = validateContentType('application/vnd.api+json')
    expect(error).toBe(null)
  })
  it('Returns error if a modified json api headers provided ', () => {
    const error = validateContentType('application/vnd.api+json;version=1')
    expect(error).toBeTruthy()

    expect(error.status).toBe(415)
  })
  it('Returns error if body and incorrect contentType provided ', () => {
    const error = validateContentType('application/json', { a: 2 })
    expect(error).toBeTruthy()
    expect(error.status).toBe(415)
  })
})
