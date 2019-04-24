const coreToNestedSync = require('./coreToNestedSync')
const nestedToCoreSync = require('./nestedToCoreSync')

const corePhysicalObject = require('./utilities/testData/corePhysicalObject')
const coreSpecimen = require('./utilities/testData/coreSpecimen')
const nestedPhysicalObject = require('./utilities/testData/nestedPhysicalObject')
const nestedSpecimen = require('./utilities/testData/nestedSpecimen')

describe('formatObject/index', () => {
  let getItemByTypeId

  beforeEach(() => {
    getItemByTypeId = (type, id) => {
      return {
        id,
        resolved: true,
        type,
      }
    }
  })

  it('transforms physical object from core to nested', () => {
    expect(
      coreToNestedSync({
        getItemByTypeId,
        item: corePhysicalObject,
        type: 'physicalObject',
      })
    ).toEqual(nestedPhysicalObject)
  })
  it('transforms physical object from nested to core', () => {
    expect(
      nestedToCoreSync({
        getItemByTypeId,
        item: nestedPhysicalObject,
        type: 'physicalObject',
      })
    ).toEqual(corePhysicalObject)
  })

  it('transforms specimen from core to nested', () => {
    expect(
      coreToNestedSync({
        getItemByTypeId,
        item: coreSpecimen,
        type: 'specimen',
      })
    ).toEqual(nestedSpecimen)
  })
  it('transforms specimen from nested to core', () => {
    expect(
      nestedToCoreSync({
        getItemByTypeId,
        item: nestedSpecimen,
        type: 'specimen',
      })
    ).toEqual(coreSpecimen)
  })

  it('gives the same result when applied several times', () => {
    const nestedFromCore = coreToNestedSync({
      getItemByTypeId,
      item: coreSpecimen,
      type: 'specimen',
    })
    const coreFromNestedFromCore = nestedToCoreSync({
      getItemByTypeId,
      item: nestedFromCore,
      type: 'specimen',
    })
    const nestedFromCoreFromNestedFromCore = coreToNestedSync({
      getItemByTypeId,
      item: coreFromNestedFromCore,
      type: 'specimen',
    })
    const coreFromNestedFromCoreFromNestedFromCore = nestedToCoreSync({
      getItemByTypeId,
      item: nestedFromCoreFromNestedFromCore,
      type: 'specimen',
    })

    expect(nestedFromCore).toEqual(nestedSpecimen)
    expect(nestedFromCoreFromNestedFromCore).toEqual(nestedSpecimen)
    expect(coreFromNestedFromCore).toEqual(coreSpecimen)
    expect(coreFromNestedFromCoreFromNestedFromCore).toEqual(coreSpecimen)
  })
})
