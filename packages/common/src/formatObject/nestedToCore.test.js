const nestedToCore = require('./nestedToCore')
const coreToNested = require('./coreToNested')
const denormalizedSpecimen = require('./utilities/testData/denormalizedSpecimen')
// const denormalizedSpecimenWithLids = require('../normalize/testData/denormalizedSpecimenWithLids')
// const normalizedSpecimenWithRelationships = require('../normalize/testData/normalizedSpecimenWithRelationships')

describe('formatObject/nestedToCore', () => {
  it('is a function', () => {
    expect(typeof nestedToCore).toBe('function')
  })

  it('dont throw in base case', () => {
    expect(() => {
      const apiFormatItem = nestedToCore({
        extractRelationships: true,
        item: denormalizedSpecimen,
        normalize: true,
        type: 'specimen',
      })
      console.log('apiFormat', JSON.stringify(apiFormatItem, null, 2))

      const getItemByTypeId = (type, id) => {
        return {
          id,
          resolved: true,
        }
      }

      const objectFormat = coreToNested({
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
