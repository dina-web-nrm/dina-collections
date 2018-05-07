'use strict';

var uuidv1 = require('uuid/v4');

module.exports = function processStrategy(node) {
  if (node.id || node.lid) {
    return node;
  }
  node.lid = uuidv1();
  return node;
};