const createQueryString = require('./createQueryString')

describe('apiClient/preProcess/createQueryString', () => {
  it('returns query string', () => {
    const queryParameters = {
      email: 'test@email.co',
      password: undefined,
      token: 'secret',
    }

    const expectedResult = 'email=test@email.co&token=secret'

    expect(createQueryString(queryParameters)).toEqual(expectedResult)
  })
  it('handle object case', () => {
    const queryParameters = {
      email: 'test@email.co',
      filter: { name: '1234' },
      password: undefined,
      token: 'secret',
    }

    const expectedResult = 'email=test@email.co&filter[name]=1234&token=secret'

    expect(createQueryString(queryParameters, false)).toEqual(expectedResult)
  })
})
