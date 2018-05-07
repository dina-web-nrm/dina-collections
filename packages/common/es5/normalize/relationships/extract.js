'use strict';

var objectPath = require('object-path');
var denormalizedSpecimen = require('../testData/denormalizedSpecimen');
var walk = require('./walkObject');

function extractRelationships(_ref) {
  var specimen = _ref.specimen,
      path = _ref.path;

  var segments = path.split('.*.');
  var relationships = [];
  walk({
    func: function func(pth) {
      var relationship = objectPath.get(specimen, pth);
      objectPath.set(specimen, pth, relationship.id);
      relationships.push(relationship);
    },
    obj: specimen,
    segments: segments
  });
  console.log('relationships', relationships);
  return specimen;
}
console.log('specimen', denormalizedSpecimen);

extractRelationships({
  path: 'individual.collectionItems.*.physicalObject',
  specimen: denormalizedSpecimen
});