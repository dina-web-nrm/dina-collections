'use strict';

var hookInEnv = require('./hookInEnv');
var describeInEnv = require('./describeInEnv');

var runInEnv = ['TEST_DB'];

exports.describe = describeInEnv({
  runInEnv: runInEnv
});

exports.hook = hookInEnv({
  runInEnv: runInEnv
});