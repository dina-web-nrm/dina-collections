'use strict';

var hookInEnv = require('./hookInEnv');
var describeInEnv = require('./describeInEnv');

var runInEnv = ['TEST_API', 'SAMPLE_DATA'];

exports.describe = describeInEnv({
  runInEnv: runInEnv
});

exports.hook = hookInEnv({
  runInEnv: runInEnv
});