'use strict';

var objectPath = require('object-path');

module.exports = function (_ref) {
  var src = _ref.src,
      target = _ref.target;

  var identifiers = objectPath.get(src, 'individual.identifiers');
  if (!identifiers) {
    return null;
  }

  target.identifiers = identifiers.map(function (identifier) {
    var value = identifier.value,
        _identifier$identifie = identifier.identifierType;
    _identifier$identifie = _identifier$identifie === undefined ? {} : _identifier$identifie;
    var key = _identifier$identifie.key;


    if (!(key && value !== undefined)) {
      return null;
    }
    return {
      key: key,
      value: value
    };
  }).filter(function (identifier) {
    return !!identifier;
  });
  return null;
};