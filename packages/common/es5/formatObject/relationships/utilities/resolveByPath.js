'use strict';

var objectPath = require('object-path');

var _require = require('../../../Dependor'),
    Dependor = _require.Dependor;

var walkObject = require('../../utilities/walkObject');

var dep = new Dependor({
  walkObject: walkObject
}, 'formatObject:relationships:utilities:resolveByPath:index');

var resolveByPath = function resolveByPath(_ref) {
  var formattedRelationshipItems = _ref.formattedRelationshipItems,
      rootItem = _ref.item,
      path = _ref.path;

  var arrayPath = Array.isArray(path) ? path : [path];

  arrayPath.forEach(function (pathItem) {
    var segments = pathItem.split('.*.').filter(function (segment) {
      return !!segment;
    });

    dep.walkObject({
      func: function func(pth) {
        var _ref2 = objectPath.get(rootItem, pth) || {},
            id = _ref2.id,
            lid = _ref2.lid;

        if (id || lid) {
          var itemToInsert = formattedRelationshipItems.find(function (candidateItem) {
            return id !== undefined && id === candidateItem.id || lid !== undefined && lid === candidateItem.lid;
          });

          if (itemToInsert) {
            objectPath.set(rootItem, pth, itemToInsert);
          }
        }
      },
      obj: rootItem,
      segments: segments
    });
  });

  return rootItem;
};

module.exports = {
  dep: dep,
  resolveByPath: resolveByPath
};