import calculateColumnWidths from './calculateColumnWidths'

describe('coreModules/layout/components/ColumnLayout/calculateColumnWidths', () => {
  test('is a function', () => {
    const testValue = typeof calculateColumnWidths
    const expectedResult = 'function'

    expect(testValue).toEqual(expectedResult)
  })

  test('throws if no columns', () => {
    const testValue = () => calculateColumnWidths()

    expect(testValue).toThrow('missing columns')
  })

  test('returns empty array if columns is empty array', () => {
    const testValue = calculateColumnWidths({ columns: [] })
    const expectedResult = []

    expect(testValue).toEqual(expectedResult)
  })

  test('returns array of pixed widths based on pixel values', () => {
    const columns = [
      { width: '100px' },
      { width: '50px' },
      { width: '20px' },
      { width: '30px' },
    ]
    const testValue = calculateColumnWidths({ columns })
    const expectedResult = ['100px', '50px', '20px', '30px']

    expect(testValue).toEqual(expectedResult)
  })

  test('returns array of pixel widths based on percent values', () => {
    const columns = [
      { width: '20%' },
      { width: '50%' },
      { width: '10%' },
      { width: '30%' },
    ]
    const testValue = calculateColumnWidths({ availableWidth: 100, columns })
    const expectedResult = ['20px', '50px', '10px', '30px']

    expect(testValue).toEqual(expectedResult)
  })

  test('calculates and adds width of column without width', () => {
    const columns = [
      { width: '50px' },
      { width: undefined },
      { width: '10%' },
      { width: '20%' },
    ]
    const availableWidth = 100
    const testValue = calculateColumnWidths({ availableWidth, columns })
    const expectedResult = ['50px', '20px', '10px', '20px']

    expect(testValue).toEqual(expectedResult)
  })
})
