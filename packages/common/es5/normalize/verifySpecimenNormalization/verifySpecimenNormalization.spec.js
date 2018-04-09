'use strict';

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var verifyIndividualGroupNormalization = require('./index');
var normalizedIndividualGroup = require('../testData/normalizedSpecimen');

describe('normalize/verifyIndividualGroupNormalization', function () {
  it('is a function', function () {
    expect(typeof verifyIndividualGroupNormalization === 'undefined' ? 'undefined' : (0, _typeof3.default)(verifyIndividualGroupNormalization)).toBe('function');
  });

  it('dont throw in base case', function () {
    expect(function () {
      verifyIndividualGroupNormalization(normalizedIndividualGroup);
    }).not.toThrow();
  });
  it('is resonable fast', function () {
    for (var i = 0; i < 1000; i += 1) {
      var input = JSON.parse((0, _stringify2.default)(normalizedIndividualGroup));
      verifyIndividualGroupNormalization(input);
    }
  });
});