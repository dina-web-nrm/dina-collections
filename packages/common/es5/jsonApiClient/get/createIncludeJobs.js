'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var objectPath = require('object-path');

module.exports = function createIncludeJobs(_ref) {
  var _ref$parentItems = _ref.parentItems,
      parentItems = _ref$parentItems === undefined ? [] : _ref$parentItems,
      relationSpecification = _ref.relationSpecification;

  var jobMap = {};

  parentItems.forEach(function (parentItem) {
    var _parentItem$path = parentItem.path,
        parentPath = _parentItem$path === undefined ? '' : _parentItem$path,
        _parentItem$relations = parentItem.relationships,
        relationships = _parentItem$relations === undefined ? {} : _parentItem$relations;

    (0, _keys2.default)(relationships).forEach(function (relationKey) {
      var path = [parentPath, relationKey].filter(function (str) {
        return !!str;
      }).join('.');
      var shouldInclude = !!objectPath.get(relationSpecification, path);
      if (shouldInclude) {
        var relationship = relationships[relationKey];

        var relationshipItems = Array.isArray(relationship.data) ? relationship.data : [relationship.data];

        relationshipItems.forEach(function (relationshipItem) {
          if (relationshipItem) {
            if (!jobMap[path]) {
              jobMap[path] = {
                ids: [],
                type: relationshipItem.type
              };
            }
            jobMap[path].ids.push(relationshipItem.id);
          }
        });
      }
    });
  });

  return (0, _keys2.default)(jobMap).map(function (path) {
    return (0, _extends3.default)({}, jobMap[path], {
      path: path
    });
  });
};