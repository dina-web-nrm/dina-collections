'use strict';

module.exports = function shouldModifyRelationship(_ref) {
  var resourcePath = _ref.resourcePath,
      _ref$relationshipsToM = _ref.relationshipsToModify,
      relationshipsToModify = _ref$relationshipsToM === undefined ? [] : _ref$relationshipsToM,
      relationKey = _ref.relationKey;

  if (relationshipsToModify.includes('all')) {
    return true;
  }
  var relationshipPath = resourcePath + '.' + relationKey;
  return relationshipsToModify.some(function (str) {
    return str.includes(relationshipPath);
  });
};