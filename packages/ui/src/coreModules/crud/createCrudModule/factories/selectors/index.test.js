import createSelectors, { dep } from './index'

describe('coreModules/crud/createCrudModule/factories/selectors', () => {
  it('is a function', () => {
    expect.assertions(1)
    expect(typeof createSelectors).toBe('function')
  })
  it('throws error if resource not provided', () => {
    expect.assertions(1)

    expect(() => {
      createSelectors({})
    }).toThrow()
  })
  it('returns object', () => {
    expect.assertions(1)
    const input = {
      resourceSpecification: {
        resource: 'physicalObject',
      },
    }
    expect(typeof createSelectors(input)).toBe('object')
  })
  it('returns object with expected keys', () => {
    expect.assertions(1)
    const input = {
      resourceSpecification: {
        resource: 'physicalObject',
      },
    }
    const expectedSelectorKeys = [
      'getItemsObject',
      'getLocalResourceState',
      'getLocalState',
      'getAll',
      'getOne',
      'getOneByLid',
    ]
    expect(Object.keys(createSelectors(input)).sort()).toEqual(
      expectedSelectorKeys.sort()
    )
  })

  describe('individual selectors', () => {
    let selectors
    let resource
    beforeAll(() => {
      resource = 'physicalObject'
      const input = {
        resourceSpecification: {
          resource,
        },
      }
      selectors = createSelectors(input)
    })

    describe('getLocalState', () => {
      it('returns local state', () => {
        const state = {
          physicalObject: {
            items: {
              '12': {
                id: '12',
                label: 'some-label',
              },
            },
          },
        }
        const globalState = { crud: { resources: state } }
        expect(selectors.getLocalState(globalState)).toEqual(state)
      })
    })

    describe('getLocalResourceState', () => {
      it('return local resource state', () => {
        const localState = {
          physicalObject: {
            items: {
              '12': {
                id: '12',
                label: 'some-label',
              },
            },
          },
        }
        expect(selectors.getLocalResourceState(localState)).toBe(
          localState.physicalObject
        )
      })
    })
    describe('getItemsObject', () => {
      it('return itemsObject', () => {
        const localState = {
          physicalObject: {
            items: {
              '12': {
                id: '12',
                label: 'some-label',
              },
            },
          },
        }
        expect(selectors.getItemsObject(localState)).toBe(
          localState.physicalObject.items
        )
      })
    })
    describe('getAll', () => {
      it('return all items', () => {
        const localState = {
          physicalObject: {
            items: {
              '12': {
                id: '12',
                label: 'some-label',
              },
              '15': {
                id: '15',
                label: 'some-label',
              },
            },
          },
        }
        expect(selectors.getAll(localState)).toEqual([
          {
            id: '12',
            label: 'some-label',
          },
          {
            id: '15',
            label: 'some-label',
          },
        ])
      })
    })
    describe('getOne', () => {
      it('return matching object when id exist', () => {
        const localState = {
          physicalObject: {
            items: {
              '12': {
                id: '12',
                label: 'some-label',
              },
              '15': {
                id: '15',
                label: 'some-label',
              },
            },
          },
        }
        expect(selectors.getOne(localState, '12')).toEqual({
          id: '12',
          label: 'some-label',
        })
      })
      it('return null id dont exist', () => {
        const localState = {
          physicalObject: {
            items: {
              '12': {
                id: '12',
                label: 'some-label',
              },
              '15': {
                id: '15',
                label: 'some-label',
              },
            },
          },
        }
        expect(selectors.getOne(localState, '17')).toEqual(null)
      })
    })
  })
  describe('with dependor - customSelectors', () => {
    let createCustomSelectorsMock
    beforeEach(() => {
      createCustomSelectorsMock = jest.fn()
      dep.freeze()
      dep.mock({
        createCustomSelectors: input => {
          createCustomSelectorsMock(input)
          return {
            customSelector: () => {
              return 2
            },
          }
        },
      })
    })
    afterAll(() => {
      dep.reset()
    })
    it('call createCustomSelectors and return result as a part of output', () => {
      expect.assertions(4)
      const input = {
        resourceSpecification: {
          customSelectors: [
            {
              text: {
                parameter: 'name',
                translated: true,
              },
              type: 'getAllAsOptions',
            },
          ],
          resource: 'physicalObject',
        },
      }
      const expectedSelectorKeys = [
        'getItemsObject',
        'getLocalResourceState',
        'getLocalState',
        'getAll',
        'getOne',
        'customSelector',
        'getOneByLid',
      ]

      const res = createSelectors(input)
      expect(res).toBeTruthy()

      expect(createCustomSelectorsMock.mock.calls.length).toEqual(1)
      expect(Object.keys(createCustomSelectorsMock.mock.calls[0][0])).toEqual([
        'customSelectorsInput',
        'resourceSelectors',
      ])

      expect(Object.keys(res).sort()).toEqual(expectedSelectorKeys.sort())
    })
  })
})
