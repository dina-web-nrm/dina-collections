'use strict';

var _require = require('./index'),
    getRelationshipParamsForAllModels = _require.getRelationshipParamsForAllModels,
    getRelationshipParamsForModelNames = _require.getRelationshipParamsForModelNames,
    getRelationshipParamsFromRelationshipsSchemaItem = _require.getRelationshipParamsFromRelationshipsSchemaItem,
    getResourceRelationshipKeysToIncludeInBodyMap = _require.getResourceRelationshipKeysToIncludeInBodyMap,
    getResourceRelationshipParamsMap = _require.getResourceRelationshipParamsMap;

describe('schemaInterface/relationships', function () {
  var models = void 0;

  beforeEach(function () {
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
                    $ref: 'card'
                  }
                }
              },
              die: {
                type: 'object',
                'x-key-stored-in-model': 'game',
                'x-key-type': 'json',
                properties: {
                  data: {
                    type: 'object',
                    $ref: 'dice'
                  }
                }
              }
            },
            'x-summary': ''
          },
          card: {
            $ref: 'card'
          },
          die: {
            type: 'array',
            items: {
              $ref: 'card'
            }
          },
          id: {
            type: 'string'
          }
        },
        'x-category': 'gameService',
        'x-modelType': 'model',
        'x-summary': '',
        description: '',
        id: 'game'
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
                      $ref: 'tally'
                    }
                  }
                }
              }
            },
            'x-summary': ''
          },
          numberOfPoints: {
            type: 'number'
          },
          id: {
            type: 'string'
          }
        },
        'x-category': 'gameService',
        'x-modelType': 'model',
        'x-summary': '',
        description: '',
        id: 'score'
      }
    };
  });

  describe('getRelationshipParamsFromRelationshipsSchemaItem', function () {
    it('returns relationship params', function () {
      var testValue = getRelationshipParamsFromRelationshipsSchemaItem({
        modelName: 'game',
        relationshipKey: 'card',
        relationshipsSchemaItem: models.game.properties.relationships.properties.card
      });
      var expectedResult = {
        allowNull: true,
        format: 'object',
        keyName: undefined,
        keyStoredInModel: 'card',
        keyType: 'sql',
        oneOrMany: 'one',
        path: 'game.points',
        sourceResource: 'game',
        storeInDocument: false,
        storeInExternalDocument: false,
        targetAs: 'card',
        targetResource: 'card'
      };

      expect(testValue).toEqual(expectedResult);
    });
  });
  describe('getRelationshipParamsForModelNames', function () {
    it('returns array of relationship params for given models', function () {
      var testValue = getRelationshipParamsForModelNames(models, ['game']);
      var expectedResult = [{
        allowNull: true,
        format: 'object',
        keyName: undefined,
        keyStoredInModel: 'card',
        keyType: 'sql',
        oneOrMany: 'one',
        path: 'game.points',
        sourceResource: 'game',
        storeInDocument: false,
        storeInExternalDocument: false,
        targetAs: 'card',
        targetResource: 'card'
      }, {
        allowNull: undefined,
        format: 'object',
        keyName: undefined,
        keyStoredInModel: 'game',
        keyType: 'json',
        oneOrMany: 'one',
        path: undefined,
        sourceResource: 'game',
        storeInDocument: true,
        storeInExternalDocument: false,
        targetAs: 'die',
        targetResource: 'dice'
      }];

      expect(testValue).toEqual(expectedResult);
    });
  });
  describe('getRelationshipParamsForAllModels', function () {
    it('returns array of all relationship params', function () {
      var testValue = getRelationshipParamsForAllModels(models);
      var expectedResult = [{
        allowNull: true,
        format: 'object',
        keyName: undefined,
        keyStoredInModel: 'card',
        keyType: 'sql',
        oneOrMany: 'one',
        path: 'game.points',
        sourceResource: 'game',
        storeInDocument: false,
        storeInExternalDocument: false,
        targetAs: 'card',
        targetResource: 'card'
      }, {
        allowNull: undefined,
        format: 'object',
        keyName: undefined,
        keyStoredInModel: 'game',
        keyType: 'json',
        oneOrMany: 'one',
        path: undefined,
        sourceResource: 'game',
        storeInDocument: true,
        storeInExternalDocument: false,
        targetAs: 'die',
        targetResource: 'dice'
      }, {
        allowNull: true,
        format: 'array',
        keyName: undefined,
        keyStoredInModel: 'tally',
        keyType: 'sql',
        oneOrMany: 'many',
        path: undefined,
        sourceResource: 'score',
        storeInDocument: false,
        storeInExternalDocument: false,
        targetAs: 'tally',
        targetResource: 'tally'
      }];

      expect(testValue).toEqual(expectedResult);
    });
  });
  describe('getResourceRelationshipParamsMap', function () {
    it('returns resource relationship params map', function () {
      var testValue = getResourceRelationshipParamsMap(models);
      var expectedResult = {
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
            storeInExternalDocument: false,
            targetAs: 'card',
            targetResource: 'card'
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
            storeInExternalDocument: false,
            targetAs: 'die',
            targetResource: 'dice'
          }
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
            storeInExternalDocument: false,
            targetAs: 'tally',
            targetResource: 'tally'
          }
        }
      };

      expect(testValue).toEqual(expectedResult);
    });
  });
  describe('getResourceRelationshipKeysToIncludeInBodyMap', function () {
    it('returns json relationships for each model', function () {
      var testValue = getResourceRelationshipKeysToIncludeInBodyMap(models);
      var expectedResult = { game: ['die'] };

      expect(testValue).toEqual(expectedResult);
    });
  });
});