const objectPath = require('object-path')
const denormalizedSpecimen = require('../testData/denormalizedSpecimen')
const walk = require('./walkObject')

function extractRelationships({ specimen, path }) {
  const segments = path.split('.*.')
  const relationships = []
  walk({
    func: pth => {
      const relationship = objectPath.get(specimen, pth)
      objectPath.set(specimen, pth, relationship.id)
      relationships.push(relationship)
    },
    obj: specimen,
    segments,
  })
  console.log('relationships', relationships)
  return specimen
}
console.log('specimen', denormalizedSpecimen)

extractRelationships({
  path: 'individual.collectionItems.*.physicalObject',
  specimen: denormalizedSpecimen,
})

// const obj = {
//   array: [
//     {
//       a: 2,
//       b: 3,
//       prop: {
//         internalArray: [
//           {
//             f: 3,
//             g: 4,
//           },
//         ],
//       },
//     },
//     {
//       a: 2,
//       b: 3,
//       prop: {
//         internalArray: [
//           {
//             f: 3,
//             g: 4,
//           },
//           {
//             f: 3,
//             g: 4,
//           },
//           {
//             f: 3,
//             g: 4,
//           },
//         ],
//       },
//     },
//   ],
// }

// const path = 'array.*.prop.internalArray'

// walk({
//   obj,
//   func: pth => {
//     const localObj = objectPath.get(obj, pth)
//     console.log('called pth', pth)
//     console.log('localObj', localObj)
//   },
//   segments: path.split('.*.'),
// })
