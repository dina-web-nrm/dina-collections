const {
  agent,
  featureType,
  place,
  preparationType,
  storageLocation,
  taxon,
} = require('./transformationFunctions')

exports.preparationType = {
  description: '',
  srcResource: 'preparationType',
  transformationFunctions: [preparationType],
}

exports.storageLocation = {
  description: '',
  srcResource: 'storageLocation',
  transformationFunctions: [storageLocation],
}

exports.place = {
  collidingIdPrefix: 'x',
  description: '',
  srcResource: 'place',
  transformationFunctions: [place],
}

exports.featureType = {
  description: '',
  srcResource: 'featureType',
  transformationFunctions: [featureType],
}

exports.agent = {
  collidingIdPrefix: 'x',
  description: '',
  srcResource: 'agent',
  transformationFunctions: [agent],
}

exports.taxon = {
  collidingIdPrefix: 'x',
  description: '',
  srcRelationships: ['parent', 'acceptedTaxonName'],
  srcResource: 'taxon',
  transformationFunctions: [taxon],
}
