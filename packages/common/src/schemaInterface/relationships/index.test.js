const {
  getRelationshipParamsForAllModels,
  getRelationshipParamsForModelNames,
  getRelationshipParamsFromRelationshipsSchemaItem,
  getResourceRelationshipKeysToIncludeInBodyMap,
  getResourceRelationshipParamsMap,
} = require('./index')

/* eslint-disable sort-keys */
describe('schemaInterface/relationships', () => {
  let models

  beforeEach(() => {
    models = {
      game: {
        additionalProperties: false,
        properties: {
          relationships: {
            type: 'object',
            properties: {
              card: {
                type: 'object',
                'x-key-allow-null': true,
                'x-key-name': undefined,
                'x-key-stored-in-model': 'card',
                'x-key-type': 'sql',
                'x-path': 'game.points',
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
      score: {
        additionalProperties: false,
        properties: {
          relationships: {
            type: 'object',
            properties: {
              tally: {
                type: 'object',
                'x-key-allow-null': true,
                'x-key-stored-in-model': 'tally',
                'x-key-type': 'sql',
                properties: {
                  data: {
                    type: 'array',
                    items: {
                      $ref: 'tally',
                    },
                  },
                },
              },
            },
            'x-summary': '',
          },
          numberOfPoints: {
            type: 'number',
          },
          id: {
            type: 'string',
          },
        },
        'x-category': 'gameService',
        'x-modelType': 'model',
        'x-summary': '',
        description: '',
        id: 'score',
      },
    }
  })

  describe('getRelationshipParamsFromRelationshipsSchemaItem', () => {
    it('returns relationship params', () => {
      const testValue = getRelationshipParamsFromRelationshipsSchemaItem({
        modelName: 'game',
        relationshipKey: 'card',
        relationshipsSchemaItem:
          models.game.properties.relationships.properties.card,
      })
      const expectedResult = {
        allowNull: true,
        format: 'object',
        keyName: undefined,
        keyStoredInModel: 'card',
        keyType: 'sql',
        oneOrMany: 'one',
        path: 'game.points',
        sourceResource: 'game',
        storeInDocument: false,
        targetAs: 'card',
        targetResource: 'card',
      }

      expect(testValue).toEqual(expectedResult)
    })
  })
  describe('getRelationshipParamsForModelNames', () => {
    it('returns array of relationship params for given models', () => {
      const testValue = getRelationshipParamsForModelNames(models, ['game'])
      const expectedResult = [
        {
          allowNull: true,
          format: 'object',
          keyName: undefined,
          keyStoredInModel: 'card',
          keyType: 'sql',
          oneOrMany: 'one',
          path: 'game.points',
          sourceResource: 'game',
          storeInDocument: false,
          targetAs: 'card',
          targetResource: 'card',
        },
        {
          allowNull: undefined,
          format: 'object',
          keyName: undefined,
          keyStoredInModel: 'game',
          keyType: 'json',
          oneOrMany: 'one',
          path: undefined,
          sourceResource: 'game',
          storeInDocument: true,
          targetAs: 'die',
          targetResource: 'dice',
        },
      ]

      expect(testValue).toEqual(expectedResult)
    })
  })
  describe('getRelationshipParamsForAllModels', () => {
    it('returns array of all relationship params', () => {
      const testValue = getRelationshipParamsForAllModels(models)
      const expectedResult = [
        {
          allowNull: true,
          format: 'object',
          keyName: undefined,
          keyStoredInModel: 'card',
          keyType: 'sql',
          oneOrMany: 'one',
          path: 'game.points',
          sourceResource: 'game',
          storeInDocument: false,
          targetAs: 'card',
          targetResource: 'card',
        },
        {
          allowNull: undefined,
          format: 'object',
          keyName: undefined,
          keyStoredInModel: 'game',
          keyType: 'json',
          oneOrMany: 'one',
          path: undefined,
          sourceResource: 'game',
          storeInDocument: true,
          targetAs: 'die',
          targetResource: 'dice',
        },
        {
          allowNull: true,
          format: 'array',
          keyName: undefined,
          keyStoredInModel: 'tally',
          keyType: 'sql',
          oneOrMany: 'many',
          path: undefined,
          sourceResource: 'score',
          storeInDocument: false,
          targetAs: 'tally',
          targetResource: 'tally',
        },
      ]

      expect(testValue).toEqual(expectedResult)
    })
  })
  describe('getResourceRelationshipParamsMap', () => {
    it('returns resource relationship params map', () => {
      const testValue = getResourceRelationshipParamsMap(models)
      const expectedResult = {
        game: {
          card: {
            allowNull: true,
            format: 'object',
            keyName: undefined,
            keyStoredInModel: 'card',
            keyType: 'sql',
            oneOrMany: 'one',
            path: 'game.points',
            sourceResource: 'game',
            storeInDocument: false,
            targetAs: 'card',
            targetResource: 'card',
          },
          die: {
            allowNull: undefined,
            format: 'object',
            keyName: undefined,
            keyStoredInModel: 'game',
            keyType: 'json',
            oneOrMany: 'one',
            path: undefined,
            sourceResource: 'game',
            storeInDocument: true,
            targetAs: 'die',
            targetResource: 'dice',
          },
        },
        score: {
          tally: {
            allowNull: true,
            format: 'array',
            keyName: undefined,
            keyStoredInModel: 'tally',
            keyType: 'sql',
            oneOrMany: 'many',
            path: undefined,
            sourceResource: 'score',
            storeInDocument: false,
            targetAs: 'tally',
            targetResource: 'tally',
          },
        },
      }

      expect(testValue).toEqual(expectedResult)
    })
  })
  describe('getResourceRelationshipKeysToIncludeInBodyMap', () => {
    it('returns json relationships for each model', () => {
      const testValue = getResourceRelationshipKeysToIncludeInBodyMap(models)
      const expectedResult = { game: ['die'] }

      expect(testValue).toEqual(expectedResult)
    })
  })
})
