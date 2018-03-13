const createMapQueryParams = require('./createMapQueryParams')

const methodSpecification = {
  parameters: [
    {
      in: 'query',
      name: 'stringObject[key]',
      schema: { type: 'string' },
    },
    {
      in: 'query',
      name: 'integerObject[key]',
      schema: { type: 'integer' },
    },
    {
      in: 'query',
      name: 'arrayStringObject[key]',
      schema: { items: { type: 'string' }, type: 'array' },
    },
    {
      in: 'query',
      name: 'sampleArrayStrings',
      schema: { items: { type: 'string' }, type: 'array' },
    },
    {
      in: 'query',
      name: 'sampleArrayIntegers',
      schema: { items: { type: 'integer' }, type: 'array' },
    },
    {
      in: 'query',
      name: 'sampleString',
      schema: { type: 'string' },
    },
    {
      in: 'query',
      name: 'sampleInteger',
      schema: { type: 'integer' },
    },
    {
      in: 'query',
      name: 'sampleBoolean',
      schema: { type: 'boolean' },
    },
  ],
}

describe('endpointFactory/utilities/createMapQueryParams', () => {
  it('is a function', () => {
    expect(typeof createMapQueryParams).toBe('function')
  })

  it('dont throw when initialized with methodSpecification', () => {
    expect(() => {
      createMapQueryParams({ methodSpecification })
    }).not.toThrow()
  })
  describe('mapping', () => {
    let mapQueryParams
    beforeAll(() => {
      mapQueryParams = createMapQueryParams({ methodSpecification })
    })

    describe('strings', () => {
      it('maps simple string', () => {
        const queryParams = {
          sampleString: '1234a',
        }
        expect(mapQueryParams(queryParams)).toEqual(queryParams)
      })
      it('cast integer to string when type is string', () => {
        const queryParams = {
          sampleString: 1234,
        }
        expect(mapQueryParams(queryParams)).toEqual({
          sampleString: '1234',
        })
      })
      it('dont modify array when type is string', () => {
        const queryParams = {
          sampleString: ['1234'],
        }
        expect(mapQueryParams(queryParams)).toEqual(queryParams)
      })
      it('dont modify object when type is string', () => {
        const queryParams = {
          sampleString: { a: 2 },
        }
        expect(mapQueryParams(queryParams)).toEqual(queryParams)
      })
      it('trims wite spaces', () => {
        const queryParams = {
          sampleString: '1234 ',
        }
        expect(mapQueryParams(queryParams)).toEqual({
          sampleString: '1234',
        })
      })
    })

    describe('booleans', () => {
      it('maps simple true boolean string', () => {
        const queryParams = {
          sampleBoolean: 'true',
        }
        expect(mapQueryParams(queryParams)).toEqual({
          sampleBoolean: true,
        })
      })
      it('maps simple false boolean string', () => {
        const queryParams = {
          sampleBoolean: 'false',
        }
        expect(mapQueryParams(queryParams)).toEqual({
          sampleBoolean: false,
        })
      })

      it('dont modify non boolean strings', () => {
        const queryParams = {
          sampleBoolean: 'falsee',
        }
        expect(mapQueryParams(queryParams)).toEqual(queryParams)
      })
    })

    describe('integer', () => {
      it('maps simple integer  string', () => {
        const queryParams = {
          sampleInteger: '1',
        }
        expect(mapQueryParams(queryParams)).toEqual({
          sampleInteger: 1,
        })
      })
      it('dont modify non integer string', () => {
        const queryParams = {
          sampleInteger: 'hej',
        }
        expect(mapQueryParams(queryParams)).toEqual({
          sampleInteger: 'hej',
        })
      })
      it('dont modify non integer numbers', () => {
        const queryParams = {
          sampleInteger: '1.1',
        }
        expect(mapQueryParams(queryParams)).toEqual({
          sampleInteger: '1.1',
        })
      })
    })

    describe('arrays', () => {
      it('maps array in string format with integers', () => {
        const queryParams = {
          sampleArrayIntegers: '[1,2,3]',
        }
        expect(mapQueryParams(queryParams)).toEqual({
          sampleArrayIntegers: [1, 2, 3],
        })
      })
      it('maps array in string format with string', () => {
        const queryParams = {
          sampleArrayStrings: '[hej,hepp]',
        }
        expect(mapQueryParams(queryParams)).toEqual({
          sampleArrayStrings: ['hej', 'hepp'],
        })
      })
      it('maps array in string format with integers to strings if type is string', () => {
        const queryParams = {
          sampleArrayStrings: '[1, 2, 3]',
        }
        expect(mapQueryParams(queryParams)).toEqual({
          sampleArrayStrings: ['1', '2', '3'],
        })
      })
      it('maps array in array format with integers to strings if type is string', () => {
        const queryParams = {
          sampleArrayStrings: [1, 2, 3],
        }
        expect(mapQueryParams(queryParams)).toEqual({
          sampleArrayStrings: ['1', '2', '3'],
        })
      })
    })
    describe('object', () => {
      it('maps stringObject with integer to string', () => {
        const queryParams = {
          stringObject: {
            key: 123,
          },
        }
        expect(mapQueryParams(queryParams)).toEqual({
          stringObject: {
            key: '123',
          },
        })
      })
      it('maps integerObject with string to integer', () => {
        const queryParams = {
          integerObject: {
            key: '123',
          },
        }
        expect(mapQueryParams(queryParams)).toEqual({
          integerObject: {
            key: 123,
          },
        })
      })
      it('maps arrayStringObject with integers to strings', () => {
        const queryParams = {
          arrayStringObject: {
            key: '[123, 223]',
          },
        }
        expect(mapQueryParams(queryParams)).toEqual({
          arrayStringObject: {
            key: ['123', '223'],
          },
        })
      })
    })
  })
})
