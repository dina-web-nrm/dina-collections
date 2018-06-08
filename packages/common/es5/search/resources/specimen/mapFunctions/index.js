'use strict';

var id = require('./id');
var identifier = require('./identifier');
var catalogNumber = require('./catalogNumber');
var collectingLocation = require('./collectingLocation');

module.exports = {
  catalogNumber: catalogNumber,
  collectingLocation: collectingLocation,
  id: id,
  identifier: identifier
};