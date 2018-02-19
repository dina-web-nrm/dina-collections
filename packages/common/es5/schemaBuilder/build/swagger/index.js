'use strict';

var createSwaggerInfo = require('./createSwaggerInfo');
var createSwaggerTags = require('./createSwaggerTags');
var createSwaggerPaths = require('./createSwaggerPaths');
var createSwaggerDefinitions = require('./createSwaggerDefinitions');

module.exports = function createSwagger(_ref) {
  var endpoints = _ref.endpoints,
      info = _ref.info,
      models = _ref.models,
      apis = _ref.apis;

  var definitions = createSwaggerDefinitions({
    endpoints: endpoints,
    models: models
  });

  return {
    swagger: '2.0',
    host: 'alpha-api-docs.dina-web.net',
    basePath: '/',
    schemes: ['http'],

    info: createSwaggerInfo(info),
    tags: createSwaggerTags({ apis: apis }),
    definitions: definitions,

    paths: createSwaggerPaths(endpoints)
  };
};