const validateAccept = require('./validateAccept')

describe('lib/serviceRouter/middlewares/validateAccept', () => {
  it('Returns null if a non json api header provided', () => {
    const error = validateAccept('application/json')
    expect(error).toBe(null)
  })
  it('Returns null if one json api header provided', () => {
    const error = validateAccept('application/vnd.api+json')
    expect(error).toBe(null)
  })
  it('Returns null if one of many accept header are correct json api header', () => {
    const error = validateAccept(
      'application/vnd.api+json;q=0.9, application/json, application/vnd.api+json'
    )
    expect(error).toBe(null)
  })
  it('Returns error if all json api headers modified ', () => {
    const error = validateAccept(
      'application/vnd.api+json;version=1, application/json'
    )
    expect(error).toBeTruthy()
    expect(error.status).toBe(406)
  })
})
