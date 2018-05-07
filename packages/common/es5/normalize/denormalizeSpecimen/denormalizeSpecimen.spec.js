'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var denormalizeSpecimen = require('./index');

var denormalizedSpecimenWithLids = require('../testData/denormalizedSpecimenWithLids');
var normalizedSpecimen = require('../testData/normalizedSpecimen');

describe('normalize/denormalizeSpecimen', function () {
  it('is a function', function () {
    expect(typeof denormalizeSpecimen === 'undefined' ? 'undefined' : (0, _typeof3.default)(denormalizeSpecimen)).toBe('function');
  });

  it('dont throw in base case', function () {
    expect(function () {
      denormalizeSpecimen(normalizedSpecimen);
    }).not.toThrow();
  });
  it('does a correct normalization when ids exist', function () {
    expect(denormalizeSpecimen(normalizedSpecimen)).toEqual(denormalizedSpecimenWithLids);
  });
  it('keeps non normalized props', function () {
    var input = (0, _extends3.default)({}, normalizedSpecimen, {
      id: '1234',
      type: 'a-type'
    });

    var expectedRes = (0, _extends3.default)({}, denormalizedSpecimenWithLids, {
      id: '1234',
      type: 'a-type'
    });

    expect(denormalizeSpecimen(input)).toEqual(expectedRes);
  });
});