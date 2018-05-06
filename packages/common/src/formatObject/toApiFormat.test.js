const toApiFormat = require('./toApiFormat')
const toObjectFormat = require('./toObjectFormat')
const denormalizedSpecimen = require('../normalize/testData/denormalizedSpecimen')
// const denormalizedSpecimenWithLids = require('../normalize/testData/denormalizedSpecimenWithLids')
// const normalizedSpecimenWithRelationships = require('../normalize/testData/normalizedSpecimenWithRelationships')

describe('formatObject/toApiFormat', () => {
  it('is a function', () => {
    expect(typeof toApiFormat).toBe('function')
  })

  it('dont throw in base case', () => {
    expect(() => {
      const apiFormatItem = toApiFormat({
        extractRelationships: true,
        item: denormalizedSpecimen,
        normalize: true,
        type: 'specimen',
      })
      // console.log('apiFormat', JSON.stringify(apiFormatItem, null, 2))

      const getItemByTypeId = (type, id) => {
        return {
          id,
          resolved: true,
        }
      }

      const objectFormat = toObjectFormat({
        denormalize: true,
        getItemByTypeId,
        item: apiFormatItem,
        resolveRelationships: true,
        type: 'specimen',
      })

      console.log('objectFormat', JSON.stringify(objectFormat, null, 2))
    }).not.toThrow()
  })
  // it('does a correct normalization when ids exist', () => {
  //   expect(normalizeSpecimen(denormalizedSpecimenWithLids)).toEqual(
  //     normalizedSpecimenWithRelationships
  //   )
  // })
})
