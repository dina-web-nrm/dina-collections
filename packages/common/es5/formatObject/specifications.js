'use strict';

var models = require('../../dist/models.json');
var createNormalizeSpecifications = require('./normalize/createNormalizeSpecifications');
var createRelationshipSpecifications = require('./relationships/createRelationshipSpecifications');

var relationshipSpecifications = createRelationshipSpecifications({ models: models });
var normalizeSpecifications = createNormalizeSpecifications({ models: models });

exports.getNormalizeSpecification = function getNormalizeSpecification(type) {
  return normalizeSpecifications[type];
};

exports.getRelationshipSpecification = function getRelationshipSpecification(type) {
  return relationshipSpecifications[type];
};