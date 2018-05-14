const nestedToCore = require('./nestedToCore')
const coreToNested = require('./coreToNested')
const denormalizedSpecimen = require('./utilities/testData/denormalizedSpecimen')

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

      const getItemByTypeId = (type, id) => {
        return {
          id,
          resolved: true,
        }
      }

      coreToNested({
        denormalize: true,
        getItemByTypeId,
        item: apiFormatItem,
        resolveRelationships: true,
        type: 'specimen',
      })
    }).not.toThrow()
  })
})
