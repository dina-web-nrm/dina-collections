const {
  preparationType,
  storageLocation,
  place,
} = require('./transformationFunctions')

exports.preparationType = {
  description: 'Importing preparation types  with...',
  srcResource: 'preparationType',
  transformationFunctions: [preparationType],
}

exports.storageLocation = {
  description: 'Importing storageLocation types  with...',
  srcResource: 'storageLocation',
  transformationFunctions: [storageLocation],
}

exports.place = {
  description: 'Importing place types  with...',
  srcResource: 'place',
  transformationFunctions: [place],
}
