'use strict';

var envDescribe = require('./envDescribe');

module.exports = envDescribe({
  dontRunInEnv: ['TEST_UNIT_FAST'],
  name: 'slowUnitDescribe',
  runInEnv: ['TEST_UNIT']
});