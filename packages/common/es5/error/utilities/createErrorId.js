'use strict';

var uuidv1 = require('uuid/v4');

module.exports = function createErrorId() {
  return uuidv1();
};