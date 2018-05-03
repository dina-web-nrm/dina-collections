import createCrudModule from './index'

const config = {
  resources: {
    physicalObject: {
      operations: [
        {
          operationId: 'physicalObjectGetOne',
          type: 'getOne',
        },
      ],
    },
  },
}

describe('coreModules/crud/CrudManager', () => {
  it('is a function', () => {
    expect.assertions(1)
    expect(typeof createCrudModule).toBe('function')
  })
  it('creates crud manager from config', () => {
    expect.assertions(1)
    const crudModule = createCrudModule(config)
    expect(crudModule).toBeTruthy()
  })
  it('exports expected keys', () => {
    expect.assertions(1)
    const crudModule = createCrudModule(config)
    expect(Object.keys(crudModule).sort()).toEqual(
      [
        'actionCreators',
        'actionHandlers',
        'actionTypes',
        'globalSelectors',
        'reducer',
        'selectors',
      ].sort()
    )
  })
})
