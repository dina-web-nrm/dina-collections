'use strict';

var path = require('path');

var buildDirectory = path.join(__dirname, '../../../common/dist/schemas');
var apiCurrentInfoPath = path.join(buildDirectory, 'apiVersions', 'current', 'info');
var modelCurrentInfoPath = path.join(buildDirectory, 'modelVersions', 'current', 'info');

var apiInfo = require(apiCurrentInfoPath);
var modelInfo = require(modelCurrentInfoPath);

if (apiInfo.candidate) {
  throw new Error('Current api is still in candidate. Run lock-schema');
}

if (modelInfo.candidate) {
  throw new Error('Current model is still in candidate. Run lock-schema');
}