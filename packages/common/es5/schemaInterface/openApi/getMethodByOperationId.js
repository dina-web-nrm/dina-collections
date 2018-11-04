'use strict';

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('reselect'),
    createSelector = _require.createSelector;

var getOpenApiSpec = function getOpenApiSpec(openApiSpec) {
  return openApiSpec;
};

var buildOperationIdPathnameMap = createSelector(getOpenApiSpec, function (openApiSpec) {
  var map = {};
  (0, _keys2.default)(openApiSpec.paths).forEach(function (pathname) {
    var methods = openApiSpec.paths[pathname];
    (0, _keys2.default)(methods).forEach(function (methodName) {
      var methodSpecification = methods[methodName];
      if (methodSpecification.operationId) map[methodSpecification.operationId] = {
        methodName: methodName,
        methodSpecification: methodSpecification,
        pathname: pathname
      };
    });
  });

  return map;
});

module.exports = createSelector(buildOperationIdPathnameMap, function (_, operationId) {
  return operationId;
}, function (map, operationId) {
  if (!map) {
    throw new Error('missing openApiSpec');
  }
  if (!operationId) {
    throw new Error('missing operationId');
  }

  return map[operationId];
});