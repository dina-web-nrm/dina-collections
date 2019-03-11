'use strict';

var hookInEnv = require('./hookInEnv');
var describeInEnv = require('./describeInEnv');

var runInEnv = ['TEST_UNIT'];
var dontRunInEnv = ['TEST_UNIT_FAST'];

exports.describe = describeInEnv({
  dontRunInEnv: dontRunInEnv,
  runInEnv: runInEnv
});

exports.hook = hookInEnv({
  dontRunInEnv: dontRunInEnv,
  runInEnv: runInEnv
});