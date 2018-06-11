'use strict';

var createLid = require('../../../createLid');

module.exports = function processStrategy(node) {
  if (node.id || node.lid) {
    return node;
  }
  node.lid = createLid();
  return node;
};