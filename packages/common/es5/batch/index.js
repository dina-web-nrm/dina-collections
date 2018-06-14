'use strict';

var execute = require('./execute');

var _require = require('./map'),
    batchMap = _require.batchMap;

var _require2 = require('./reduce'),
    batchReduce = _require2.batchReduce;

module.exports = {
  execute: execute,
  map: batchMap,
  reduce: batchReduce
};