'use strict';

var _require = require('lodash'),
    isEqual = _require.isEqual;

var normalizeSpecimen = require('../normalizeSpecimen');
var denormalizeSpecimen = require('../denormalizeSpecimen');

module.exports = function verifySpecimenNormalization(normalizedSpecimenInput) {
  var denormalized = denormalizeSpecimen(normalizedSpecimenInput);
  var renormalized = normalizeSpecimen(denormalized);
  if (!isEqual(normalizedSpecimenInput, renormalized)) {
    throw new Error('Renormalization not same as normalized version');
  }
};