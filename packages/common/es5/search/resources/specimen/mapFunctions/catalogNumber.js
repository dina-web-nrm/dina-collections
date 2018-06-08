'use strict';

var objectPath = require('object-path');

module.exports = function (_ref) {
  var src = _ref.src,
      target = _ref.target;

  var identifiers = objectPath.get(src, 'individual.identifiers');
  if (!identifiers) {
    return null;
  }
  var catalogNumber = void 0;

  identifiers.forEach(function (identifier) {
    if (!catalogNumber) {
      var value = identifier.value,
          _identifier$identifie = identifier.identifierType;
      _identifier$identifie = _identifier$identifie === undefined ? {} : _identifier$identifie;
      var key = _identifier$identifie.key;


      if (key === 'catalog-number') {
        catalogNumber = value;
      }
    }
  });

  if (catalogNumber) {
    target.catalogNumber = catalogNumber;
  }

  return null;
};