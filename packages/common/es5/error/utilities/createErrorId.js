'use strict';

var uuidv1 = require('uuid/v1');

module.exports = function createErrorId() {
  return uuidv1();
};