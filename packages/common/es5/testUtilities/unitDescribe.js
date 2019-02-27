'use strict';

var envDescribe = require('./envDescribe');

module.exports = envDescribe({
  name: 'unitDescribe',
  runInEnv: ['TEST_UNIT']
});