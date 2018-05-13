'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getModelType = require('../utilities/getModelType');
var getModelRelationshipPath = require('../utilities/getModelRelationshipPath');
var getModelFormat = require('../utilities/getModelFormat');

module.exports = function createRelationshipSpecification() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$relationships = _ref.relationships,
      relationships = _ref$relationships === undefined ? {} : _ref$relationships;

  return (0, _keys2.default)(relationships.properties || {}).reduce(function (modelRelationships, relationshipKey) {
    var modelRelationship = relationships.properties[relationshipKey];
    var path = getModelRelationshipPath(modelRelationship);

    return (0, _extends4.default)({}, modelRelationships, (0, _defineProperty3.default)({}, relationshipKey, {
      format: getModelFormat(modelRelationship.properties.data),
      path: path,
      type: getModelType(modelRelationship.properties.data)
    }));
  }, {});
};