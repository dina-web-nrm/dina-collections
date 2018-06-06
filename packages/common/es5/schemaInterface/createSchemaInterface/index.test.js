'use strict';

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createSchemaInterface = require('./index');

var expectedFunctions = ['getRelationshipParamsForModelNames', 'getResourceRelationshipKeysToIncludeInBodyMap', 'getResourceRelationshipParamsMap'];

describe('schemaInterface/createSchemaInterface', function () {
  it('exports a function', function () {
    expect(typeof createSchemaInterface === 'undefined' ? 'undefined' : (0, _typeof3.default)(createSchemaInterface)).toEqual('function');
  });
  it('returns expected functions', function () {
    expect((0, _keys2.default)(createSchemaInterface({})).sort()).toEqual(expectedFunctions.sort());
  });
});