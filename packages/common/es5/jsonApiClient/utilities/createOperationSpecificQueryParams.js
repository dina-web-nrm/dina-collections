'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getRelativeRelationships = require('./getRelativeRelationships');

module.exports = function createOperationSpecificQueryParams(_ref) {
  var path = _ref.path,
      queryParams = _ref.queryParams,
      relationSpecification = _ref.relationSpecification;

  var operationSpecificQueryParams = (0, _extends3.default)({}, queryParams);
  delete operationSpecificQueryParams.relationships;
  delete operationSpecificQueryParams.include;

  var relativeRelationships = getRelativeRelationships({
    path: path,
    relationSpecification: relationSpecification
  });

  console.log('operationSpecificQueryParams', operationSpecificQueryParams);
  if (relativeRelationships) {
    return (0, _extends3.default)({}, operationSpecificQueryParams, {
      relationships: relativeRelationships });
  }

  return operationSpecificQueryParams;
};