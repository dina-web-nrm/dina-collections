'use strict';

var hookInEnv = require('./hookInEnv');
var describeInEnv = require('./describeInEnv');

var runInEnv = ['TEST_API'];

exports.describe = describeInEnv({
  runInEnv: runInEnv
});

exports.hook = hookInEnv({
  runInEnv: runInEnv
});