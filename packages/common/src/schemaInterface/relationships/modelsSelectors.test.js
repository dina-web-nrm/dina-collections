const {
  getAllModelNames,
  getModelRelationshipsSchemaMap,
  getModelRelationshipsSchemaForModel,
  getModels,
} = require('./modelsSelectors')

/* eslint-disable sort-keys */
describe('schemaInterface/relationships/modelsSelectors', () => {
  let models

  beforeEach(() => {
    models = {
      card: {
        additionalProperties: false,
        properties: {
          relationships: {
            type: 'object',
            properties: {
              deck: {
                type: 'object',
                'x-key-stored-in-model': 'card',
                'x-key-type': 'sql',
                properties: {
                  data: {
                    type: 'object',
                    $ref: 'deck',
                  },
                },
              },
            },
            'x-summary': '',
          },
          deck: {
            $ref: 'deck',
          },
          id: {
            type: 'string',
          },
        },
        'x-category': 'gameService',
        'x-modelType': 'model',
        'x-summary': '',
        description: '',
        id: 'card',
      },
      game: {
        additionalProperties: false,
        properties: {
          relationships: {
            type: 'object',
            properties: {
              card: {
                type: 'object',
                'x-key-stored-in-model': 'card',
                'x-key-type': 'sql',
                properties: {
                  data: {
                    type: 'object',
                    $ref: 'card',
                  },
                },
              },
              die: {
                type: 'object',
                'x-key-stored-in-model': 'game',
                'x-key-type': 'json',
                properties: {
                  data: {
                    type: 'object',
                    $ref: 'dice',
                  },
                },
              },
            },
            'x-summary': '',
          },
          card: {
            $ref: 'card',
          },
          die: {
            type: 'array',
            items: {
              $ref: 'card',
            },
          },
          id: {
            type: 'string',
          },
        },
        'x-category': 'gameService',
        'x-modelType': 'model',
        'x-summary': '',
        description: '',
        id: 'game',
      },
    }
  })

  describe('getModels', () => {
    it('is a function', () => {
      expect(typeof getModels).toEqual('function')
    })
    it('returns input', () => {
      const testValue = getModels(models)
      const expectedResult = models

      expect(testValue).toEqual(expectedResult)
    })
  })

  describe('getAllModelNames', () => {
    it('is a function', () => {
      expect(typeof getAllModelNames).toEqual('function')
    })
    it('returns all model names', () => {
      const testValue = getAllModelNames(models)
      const expectedResult = ['card', 'game']

      expect(testValue).toEqual(expectedResult)
    })
  })

  describe('getModelRelationshipsSchemaForModel', () => {
    it('is a function', () => {
      expect(typeof getModelRelationshipsSchemaForModel).toEqual('function')
    })
    it('throws for missing model name', () => {
      expect(() =>
        getModelRelationshipsSchemaForModel(models, undefined)
      ).toThrow('missing model name')
    })
    it('throws for missing model', () => {
      expect(() =>
        getModelRelationshipsSchemaForModel(models, 'invalidExampleModelName')
      ).toThrow('not found in models')
    })
    it('returns the relationships schema', () => {
      const modelName = 'game'
      const testValue = getModelRelationshipsSchemaForModel(models, modelName)
      const expectedResult = {
        type: 'object',
        properties: {
          card: {
            type: 'object',
            'x-key-stored-in-model': 'card',
            'x-key-type': 'sql',
            properties: {
              data: {
                type: 'object',
                $ref: 'card',
              },
            },
          },
          die: {
            type: 'object',
            'x-key-stored-in-model': 'game',
            'x-key-type': 'json',
            properties: {
              data: {
                type: 'object',
                $ref: 'dice',
              },
            },
          },
        },
        'x-summary': '',
      }

      expect(testValue).toEqual(expectedResult)
    })
  })

  describe('getModelRelationshipsSchemaMap', () => {
    it('is a function', () => {
      expect(typeof getModelRelationshipsSchemaMap).toEqual('function')
    })
    it('throws for missing models', () => {
      expect(() => getModelRelationshipsSchemaMap()).toThrow('missing models')
    })
    it('returns the relationships schema map', () => {
      const testValue = getModelRelationshipsSchemaMap(models)
      const expectedResult = {
        card: {
          type: 'object',
          properties: {
            deck: {
              type: 'object',
              'x-key-stored-in-model': 'card',
              'x-key-type': 'sql',
              properties: {
                data: {
                  type: 'object',
                  $ref: 'deck',
                },
              },
            },
          },
          'x-summary': '',
        },
        game: {
          type: 'object',
          properties: {
            card: {
              type: 'object',
              'x-key-stored-in-model': 'card',
              'x-key-type': 'sql',
              properties: {
                data: {
                  type: 'object',
                  $ref: 'card',
                },
              },
            },
            die: {
              type: 'object',
              'x-key-stored-in-model': 'game',
              'x-key-type': 'json',
              properties: {
                data: {
                  type: 'object',
                  $ref: 'dice',
                },
              },
            },
          },
          'x-summary': '',
        },
      }

      expect(testValue).toEqual(expectedResult)
    })
  })
})
