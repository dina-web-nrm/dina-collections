'use strict';

var buildRelationships = require('./buildRelationships');
var buildLinks = require('./buildLinks');
var buildIncluded = require('./buildIncluded');
var buildBase = require('./buildBase');
var buildItem = require('./buildItem');
var buildRaw = require('./buildRaw');


module.exports = function buildResponse(_ref) {
  var description = _ref.description,
      examples = _ref.examples,
      format = _ref.format,
      _ref$include = _ref.include,
      include = _ref$include === undefined ? null : _ref$include,
      operationId = _ref.operationId,
      raw = _ref.raw,
      relationBase = _ref.relationBase,
      relations = _ref.relations,
      resource = _ref.resource,
      selfLink = _ref.selfLink,
      versionsLink = _ref.versionsLink;

  var name = operationId + 'Response';
  if (raw) {
    return buildRaw({
      name: name,
      raw: raw
    });
  }

  var relationships = buildRelationships({
    format: format,
    relationBase: relationBase,
    relations: relations,
    selfLink: selfLink,
    versionsLink: versionsLink
  });
  var links = buildLinks({ selfLink: selfLink });
  var included = buildIncluded(include);

  var item = buildItem({ resource: resource, relationships: relationships });

  var base = buildBase({
    description: description,
    examples: examples,
    format: format,
    included: included,
    item: item,
    links: links,
    name: name
  });
  return base;
};