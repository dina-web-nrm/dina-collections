import calculateRowHeights from './calculateRowHeights'

describe('coreModules/layout/components/RowLayout/calculateRowHeights', () => {
  test('is a function', () => {
    const testValue = typeof calculateRowHeights
    const expectedResult = 'function'

    expect(testValue).toEqual(expectedResult)
  })

  test('throws if no rows', () => {
    const testValue = () => calculateRowHeights()

    expect(testValue).toThrow('missing rows')
  })

  test('returns empty array if rows is empty array', () => {
    const testValue = calculateRowHeights({ rows: [] })
    const expectedResult = []

    expect(testValue).toEqual(expectedResult)
  })

  test('returns array of pixed heights based on pixel values', () => {
    const rows = [
      { height: '100px' },
      { height: '50px' },
      { height: '20px' },
      { height: '30px' },
    ]
    const testValue = calculateRowHeights({ rows })
    const expectedResult = ['100px', '50px', '20px', '30px']

    expect(testValue).toEqual(expectedResult)
  })

  test('returns array of pixel heights based on percent values', () => {
    const rows = [
      { height: '20%' },
      { height: '50%' },
      { height: '10%' },
      { height: '30%' },
    ]
    const testValue = calculateRowHeights({ availableHeight: 100, rows })
    const expectedResult = ['20px', '50px', '10px', '30px']

    expect(testValue).toEqual(expectedResult)
  })

  test('calculates and adds height of row without height', () => {
    const rows = [
      { height: '50px' },
      { height: undefined, overflow: 'scroll' },
      { height: '10%' },
      { height: '20%' },
    ]
    const availableHeight = 100
    const testValue = calculateRowHeights({ availableHeight, rows })
    const expectedResult = ['50px', '20px', '10px', '20px']

    expect(testValue).toEqual(expectedResult)
  })
})
