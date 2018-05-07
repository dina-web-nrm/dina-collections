'use strict';

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var immutable = require('object-path-immutable');
var objectPath = require('object-path');

var walk = function walk(_ref) {
  var obj = _ref.obj,
      _ref$path = _ref.path,
      path = _ref$path === undefined ? '' : _ref$path,
      segments = _ref.segments,
      func = _ref.func;

  if (!segments.length) {
    func(path);
  }

  var currentSegment = segments[0];

  var arrayPath = path + '.' + currentSegment;

  var array = objectPath.get(obj, arrayPath) || [];
  return array.map(function (_, index) {
    var itemPath = arrayPath + '.' + index;
    walk({
      func: func,
      obj: obj,
      path: itemPath,
      segments: segments.slice(1)
    });
  });
};

var extractRelationship = function extractRelationship(path) {
  var segments = path.split('.*.');

  segments.forEach(function (segment) {});
};

module.exports = function extractRelationships(_ref2) {
  var specification = _ref2.specification,
      specimen = _ref2.specimen;

  var relationshipsSpecification = specification.relationships;

  if (!(relationshipsSpecification && relationshipsSpecification.entities)) {
    return specimen;
  }

  var modifiledSpecimen = (0, _extends3.default)({}, specimen);

  (0, _keys2.default)(relationshipsSpecification.entities).forEach(function (relationshipKey) {
    console.log('relationshipKey', relationshipKey);
    var relationship = relationshipsSpecification.entities[relationshipKey];
    console.log('relationship', relationship);
  });

  return modifiledSpecimen;
};