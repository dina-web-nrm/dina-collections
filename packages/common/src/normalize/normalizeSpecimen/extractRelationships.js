const immutable = require('object-path-immutable')
const objectPath = require('object-path')

// const path = 'individual.collectionItems.*.physicalObject'

// path.split('.*.')

// // ['individual.collectionItems', 'physicalObject']

const walk = ({ obj, path = '', segments, func }) => {
  if (!segments.length) {
    func(path)
  }

  const currentSegment = segments[0]

  const arrayPath = `${path}.${currentSegment}`

  const array = objectPath.get(obj, arrayPath) || []
  return array.map((_, index) => {
    const itemPath = `${arrayPath}.${index}`
    walk({
      func,
      obj,
      path: itemPath,
      segments: segments.slice(1),
    })
  })
}

const extractRelationship = path => {
  const segments = path.split('.*.')

  segments.forEach(segment => {})
}

module.exports = function extractRelationships({ specification, specimen }) {
  const relationshipsSpecification = specification.relationships

  if (!(relationshipsSpecification && relationshipsSpecification.entities)) {
    return specimen
  }

  let modifiledSpecimen = {
    ...specimen,
  }

  Object.keys(relationshipsSpecification.entities).forEach(relationshipKey => {
    console.log('relationshipKey', relationshipKey)
    const relationship = relationshipsSpecification.entities[relationshipKey]
    console.log('relationship', relationship)
  })

  return modifiledSpecimen
}
