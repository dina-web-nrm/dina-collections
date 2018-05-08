'use strict';

var uuidv4 = require('uuid/v4');

module.exports = function createLid() {
  return uuidv4();
};