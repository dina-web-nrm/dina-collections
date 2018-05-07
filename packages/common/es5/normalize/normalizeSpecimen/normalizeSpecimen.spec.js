'use strict';

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var normalizeSpecimen = require('./index');

var denormalizedSpecimen = require('../testData/denormalizedSpecimen');
var denormalizedSpecimenWithLids = require('../testData/denormalizedSpecimenWithLids');
var normalizedSpecimenWithRelationships = require('../testData/normalizedSpecimenWithRelationships');

describe('normalize/normalizeSpecimen', function () {
  it('is a function', function () {
    expect(typeof normalizeSpecimen === 'undefined' ? 'undefined' : (0, _typeof3.default)(normalizeSpecimen)).toBe('function');
  });

  it('dont throw in base case', function () {
    expect(function () {
      normalizeSpecimen(denormalizedSpecimen);
    }).not.toThrow();
  });
  it('does a correct normalization when ids exist', function () {
    expect(normalizeSpecimen(denormalizedSpecimenWithLids)).toEqual(normalizedSpecimenWithRelationships);
  });
});