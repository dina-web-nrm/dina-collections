import extractProps from './index'

describe('utilities/extractProps', () => {
  test('returns a function', () => {
    expect(typeof extractProps).toEqual('function')
  })

  test('returns extracted props', () => {
    const { extractedProps } = extractProps({
      keys: ['love', 'sunshine'],
      props: {
        hate: null,
        love: true,
        rain: [],
        sunshine: 1,
      },
    })

    expect(extractedProps).toEqual({
      love: true,
      sunshine: 1,
    })
  })

  test('returns rest props', () => {
    const { rest } = extractProps({
      keys: ['love', 'sunshine'],
      props: {
        hate: null,
        love: true,
        rain: [],
        sunshine: 1,
      },
    })

    expect(rest).toEqual({
      hate: null,
      rain: [],
    })
  })

  test('returns extracted props and rest with defaults applied', () => {
    const { extractedProps, rest } = extractProps({
      defaults: {
        someNumber: 0,
        someString: '',
      },
      keys: ['foo', 'someNumber'],
      props: {
        bar: 1,
        foo: {},
        someNumber: undefined,
        someString: undefined,
      },
    })

    expect(extractedProps).toEqual({
      foo: {},
      someNumber: 0,
    })
    expect(rest).toEqual({
      bar: 1,
      someString: '',
    })
  })
})
