const createQueryString = require('./createQueryString')

describe('utilities/apiClient/preProcess/createQueryString', () => {
  it('returns query string', () => {
    const queryParameters = {
      email: 'test@email.co',
      password: undefined,
      token: 'secret',
    }

    const expectedResult = 'email=test@email.co&token=secret'

    expect(createQueryString(queryParameters)).toEqual(expectedResult)
  })
})
