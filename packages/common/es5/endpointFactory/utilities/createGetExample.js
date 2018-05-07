'use strict';

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getExamplesFromMethodSpecifiction = require('./getExamplesFromMethodSpecifiction');

module.exports = function createGetExample(_ref) {
  var methodSpecification = _ref.methodSpecification,
      openApiSpec = _ref.openApiSpec;

  var examples = getExamplesFromMethodSpecifiction({
    methodSpecification: methodSpecification,
    openApiSpec: openApiSpec
  });
  return function (exampleId) {
    if (!examples) {
      return _promise2.default.resolve(null);
    }

    return _promise2.default.resolve(examples[exampleId]);
  };
};