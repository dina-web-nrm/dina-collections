'use strict';

var catalogNumber = require('./catalogNumber');
var id = require('./id');
var identifier = require('./identifier');
var collectingLocation = require('./collectingLocation');

module.exports = {
  catalogNumber: catalogNumber,
  collectingLocation: collectingLocation,
  id: id,
  identifier: identifier
};