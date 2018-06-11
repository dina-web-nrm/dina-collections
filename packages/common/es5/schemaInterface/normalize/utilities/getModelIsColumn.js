'use strict';

var getModelColumn = require('./getModelColumn');

module.exports = function getModelIsColumn(model) {
  return !!getModelColumn(model);
};