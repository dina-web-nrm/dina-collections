'use strict';

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('./modelsSelectors'),
    getAllModelNames = _require.getAllModelNames,
    getModelRelationshipsSchemaMap = _require.getModelRelationshipsSchemaMap,
    getModelRelationshipsSchemaForModel = _require.getModelRelationshipsSchemaForModel,
    getModels = _require.getModels;

describe('schemaInterface/relationships/modelsSelectors', function () {
  var models = void 0;

  beforeEach(function () {
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
                    $ref: 'deck'
                  }
                }
              }
            },
            'x-summary': ''
          },
          deck: {
            $ref: 'deck'
          },
          id: {
            type: 'string'
          }
        },
        'x-category': 'gameService',
        'x-modelType': 'model',
        'x-summary': '',
        description: '',
        id: 'card'
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
      }
    };
  });

  describe('getModels', function () {
    it('is a function', function () {
      expect(typeof getModels === 'undefined' ? 'undefined' : (0, _typeof3.default)(getModels)).toEqual('function');
    });
    it('returns input', function () {
      var testValue = getModels(models);
      var expectedResult = models;

      expect(testValue).toEqual(expectedResult);
    });
  });

  describe('getAllModelNames', function () {
    it('is a function', function () {
      expect(typeof getAllModelNames === 'undefined' ? 'undefined' : (0, _typeof3.default)(getAllModelNames)).toEqual('function');
    });
    it('returns all model names', function () {
      var testValue = getAllModelNames(models);
      var expectedResult = ['card', 'game'];

      expect(testValue).toEqual(expectedResult);
    });
  });

  describe('getModelRelationshipsSchemaForModel', function () {
    it('is a function', function () {
      expect(typeof getModelRelationshipsSchemaForModel === 'undefined' ? 'undefined' : (0, _typeof3.default)(getModelRelationshipsSchemaForModel)).toEqual('function');
    });
    it('throws for missing model name', function () {
      expect(function () {
        return getModelRelationshipsSchemaForModel(models, undefined);
      }).toThrow('missing model name');
    });
    it('throws for missing model', function () {
      expect(function () {
        return getModelRelationshipsSchemaForModel(models, 'invalidExampleModelName');
      }).toThrow('not found in models');
    });
    it('returns the relationships schema', function () {
      var modelName = 'game';
      var testValue = getModelRelationshipsSchemaForModel(models, modelName);
      var expectedResult = {
        type: 'object',
        properties: {
          card: {
            type: 'object',
            'x-key-stored-in-model': 'card',
            'x-key-type': 'sql',
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
      };

      expect(testValue).toEqual(expectedResult);
    });
  });

  describe('getModelRelationshipsSchemaMap', function () {
    it('is a function', function () {
      expect(typeof getModelRelationshipsSchemaMap === 'undefined' ? 'undefined' : (0, _typeof3.default)(getModelRelationshipsSchemaMap)).toEqual('function');
    });
    it('throws for missing models', function () {
      expect(function () {
        return getModelRelationshipsSchemaMap();
      }).toThrow('missing models');
    });
    it('returns the relationships schema map', function () {
      var testValue = getModelRelationshipsSchemaMap(models);
      var expectedResult = {
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
                  $ref: 'deck'
                }
              }
            }
          },
          'x-summary': ''
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
        }
      };

      expect(testValue).toEqual(expectedResult);
    });
  });
});