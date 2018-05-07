'use strict';

var immutable = require('object-path-immutable');
var objectPath = require('object-path');

module.exports = function createRelationSpecification(queryParams) {
  var _queryParams$relation = queryParams.relationships,
      relationships = _queryParams$relation === undefined ? [] : _queryParams$relation,
      _queryParams$include = queryParams.include,
      include = _queryParams$include === undefined ? [] : _queryParams$include;

  var specification = {};

  relationships.forEach(function (relationshipPath) {
    specification = immutable.set(specification, relationshipPath, false);
  });

  include.forEach(function (includePath) {
    var node = objectPath.get(specification, includePath);
    if (node === undefined) {
      throw new Error('Cant include resource not specificed in relationships');
    }
    if (node === false) {
      specification = immutable.set(specification, includePath, true);
    }
  });
  return specification;
};