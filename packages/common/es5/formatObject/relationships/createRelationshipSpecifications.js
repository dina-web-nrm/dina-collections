'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createRelationshipSpecification = require('./createRelationshipSpecification');

module.exports = function createRelationshipSpecifications() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$models = _ref.models,
      models = _ref$models === undefined ? {} : _ref$models;

  return (0, _keys2.default)(models).reduce(function (specifications, modelKey) {
    var model = models[modelKey];
    var relationships = model.properties && model.properties.relationships;
    if (!relationships) {
      return specifications;
    }

    var relationshipSpecification = createRelationshipSpecification({
      relationships: relationships
    });

    if (relationshipSpecification && (0, _keys2.default)(relationshipSpecification).length) {
      return (0, _extends4.default)({}, specifications, (0, _defineProperty3.default)({}, modelKey, relationshipSpecification));
    }

    return specifications;
  }, {});
};