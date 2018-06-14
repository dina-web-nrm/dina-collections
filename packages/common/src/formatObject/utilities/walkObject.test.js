const walkObject = require('./walkObject')

describe('formatObject/utilities/walkObject', () => {
  test('throws if no obj', () => {
    const testValue = () => walkObject({})
    const expectedResult = 'must provide object'

    expect(testValue).toThrow(expectedResult)
  })

  test('throws if no func', () => {
    const testValue = () => walkObject({ obj: { test: 'lol' } })
    const expectedResult = 'must provide func'

    expect(testValue).toThrow(expectedResult)
  })

  test('calls func with path if there are no more segments', () => {
    const func = jest.fn()

    walkObject({
      func,
      obj: {
        name: 'Leia',
      },
      path: 'name',
      segments: [],
    })

    expect(func).toHaveBeenCalledWith('name')
  })

  test('does not call func if value at path is falsy', () => {
    const func = jest.fn()
    const obj = {
      Leia: {
        brother: 'Luke',
        son: undefined,
      },
    }

    walkObject({
      func,
      obj,
      segments: ['Leia.son'],
    })

    expect(func).not.toHaveBeenCalled()
  })

  test('does not call func if value at path is falsy', () => {
    const func = jest.fn()
    const obj = {
      Leia: {
        brother: 'Luke',
        son: undefined,
      },
    }

    walkObject({
      func,
      obj,
      segments: ['Leia.son'],
    })

    expect(func).not.toHaveBeenCalled()
  })

  test('calls func with nextPath if it is truthy but not an array', () => {
    const func = jest.fn()
    const obj = {
      Leia: {
        relatives: {
          brother: 'Luke',
          son: undefined,
        },
      },
    }

    walkObject({
      func,
      obj,
      path: 'Leia',
      segments: ['relatives', 'brother'],
    })

    expect(func).toHaveBeenCalledWith('Leia.relatives')
  })

  test('calls func with name for each relative in array', () => {
    const func = jest.fn()
    const obj = {
      Leia: {
        relatives: [{ name: 'Luke' }, { name: 'Anakin' }],
      },
    }

    walkObject({
      func,
      obj,
      segments: ['Leia.relatives', 'name'],
    })

    expect(func).toHaveBeenCalledTimes(2)
    expect(func).toHaveBeenCalledWith('Leia.relatives.0.name')
    expect(func).toHaveBeenCalledWith('Leia.relatives.1.name')
  })
})
