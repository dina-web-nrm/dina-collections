import createKeySpecifications, {
  createVerbKeySpecifications,
} from './createKeySpecifications'

describe('utilities/keyObjectModuleFactory/createKeySpecifications', () => {
  describe('createKeySpecifications', () => {
    it('is a function', () => {
      return expect(typeof createKeySpecifications).toBe('function')
    })
    it('handle complex case', () => {
      const actionPrefix = 'TEST'
      const keys = [
        'filter',
        'filter.search',
        ':scope',
        ':scope.object',
        ':scope.object.value',
      ]
      return expect(
        createKeySpecifications({
          actionPrefix,
          keys,
        })
      ).toEqual({
        del: {
          ':scope': {
            actionType: 'TEST_DEL_SCOPE',
            cleanKey: 'scope',
            key: ':scope',
            parameters: ['scope'],
          },
          ':scope.object': {
            actionType: 'TEST_DEL_SCOPE_OBJECT',
            cleanKey: 'scope.object',
            key: ':scope.object',
            parameters: ['scope'],
          },
          ':scope.object.value': {
            actionType: 'TEST_DEL_SCOPE_OBJECT_VALUE',
            cleanKey: 'scope.object.value',
            key: ':scope.object.value',
            parameters: ['scope'],
          },
          filter: {
            actionType: 'TEST_DEL_FILTER',
            cleanKey: 'filter',
            key: 'filter',
            parameters: [],
          },
          'filter.search': {
            actionType: 'TEST_DEL_FILTER_SEARCH',
            cleanKey: 'filter.search',
            key: 'filter.search',
            parameters: [],
          },
        },
        set: {
          ':scope': {
            actionType: 'TEST_SET_SCOPE',
            cleanKey: 'scope',
            key: ':scope',
            parameters: ['scope'],
          },
          ':scope.object': {
            actionType: 'TEST_SET_SCOPE_OBJECT',
            cleanKey: 'scope.object',
            key: ':scope.object',
            parameters: ['scope'],
          },
          ':scope.object.value': {
            actionType: 'TEST_SET_SCOPE_OBJECT_VALUE',
            cleanKey: 'scope.object.value',
            key: ':scope.object.value',
            parameters: ['scope'],
          },
          filter: {
            actionType: 'TEST_SET_FILTER',
            cleanKey: 'filter',
            key: 'filter',
            parameters: [],
          },
          'filter.search': {
            actionType: 'TEST_SET_FILTER_SEARCH',
            cleanKey: 'filter.search',
            key: 'filter.search',
            parameters: [],
          },
        },
      })
    })
  })
  describe('createVerbKeySpecifications', () => {
    it('is a function', () => {
      return expect(typeof createVerbKeySpecifications).toBe('function')
    })
  })
})
