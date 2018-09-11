const coreToNestedSync = require('./coreToNestedSync')
const apiFormatPhysicalObject = require('./utilities/testData/apiFormatPhysicalObject')
const apiFormatSpecimen = require('./utilities/testData/apiFormatSpecimen')
const nestedPhysicalObjectWithRelationships = require('./utilities/testData/nestedPhysicalObjectWithRelationships')

/* eslint-disable sort-keys */
describe('formatObject/coreToNestedSync', () => {
  it('is a function', () => {
    expect(typeof coreToNestedSync).toBe('function')
  })
  it('returns falsy item', () => {
    const item = null
    expect(
      coreToNestedSync({
        denormalize: true,
        extractRelationships: true,
        item,
        type: 'specimen',
      })
    ).toEqual(null)
  })

  it('returns denormalized item with nested item keys', () => {
    const getItemByTypeId = (type, id) => {
      return {
        id,
        resolved: true,
      }
    }

    const nestedItem = coreToNestedSync({
      denormalize: true,
      extractRelationships: true,
      getItemByTypeId,
      item: apiFormatSpecimen,
      type: 'specimen',
    })
    const nestedItemKeys = Object.keys(nestedItem).sort()
    expect(nestedItemKeys).toEqual(['id', 'individual'])
  })

  it('returns non-denormalized item with expected content', () => {
    const getItemByTypeId = (type, id) => {
      return {
        id,
        resolved: true,
      }
    }

    const testValue = coreToNestedSync({
      denormalize: false,
      extractRelationships: true,
      getItemByTypeId,
      item: apiFormatPhysicalObject,
      type: 'physicalObject',
    })

    const expectedResult = nestedPhysicalObjectWithRelationships

    expect(testValue).toEqual(expectedResult)
  })

  describe('deeper check of denormalized nested item format', () => {
    let nestedItem
    let individual
    beforeEach(() => {
      const getItemByTypeId = (type, id) => {
        return {
          id,
          resolved: true,
          type,
        }
      }

      nestedItem = coreToNestedSync({
        denormalize: true,
        extractRelationships: true,
        getItemByTypeId,
        item: apiFormatSpecimen,
        type: 'specimen',
      })
      individual = nestedItem.individual // eslint-disable-line prefer-destructuring
    })

    it('has expected individual keys', () => {
      const individualKeys = Object.keys(individual).sort()
      expect(individualKeys).toEqual([
        'collectingInformation',
        'collectionItems',
        'determinations',
        'featureObservations',
        'identifiers',
        'lid',
        'recordHistoryEvents',
        'taxonInformation',
      ])
    })
    it('has collectingInformation', () => {
      const attribute = individual.collectingInformation
      const expectedFormat = [
        {
          collectedByAgent: { textI: 'collectorsText' },
          event: {
            endDate: 'endDate',
            expeditionText: 'expeditionText',
            locationInformation: {
              coordinatesVerbatim: 'coordinatesVerbatim',
              places: [
                {
                  id: '1',
                },
                {
                  id: '2',
                },
                {
                  id: '3',
                },
                {
                  id: '4',
                },
                {
                  id: '5',
                },
              ],
              georeferenceSourcesText: 'georeferenceSourcesText',
              localityVerbatim: 'localityVerbatim',
              position: {
                geodeticDatum: 'geodeticDatum text',
                latitude: 'latitude-string',
                longitude: 'longitude-string',
                uncertaintyInMeters: 10,
              },
              remarks: 'remarks',
              verticalPosition: {
                maximumDepthInMeters: 100,
                maximumElevationInMeters: 100,
                minimumDepthInMeters: 20,
                minimumElevationInMeters: 20,
              },
            },
            lid: 'd61ec620-e5df-4141-8691-a0fe42ec0c5b',
          },
          lid: '06c5b25b-13dd-4c27-8bc2-18723fb1beb3',
        },
      ]
      expect(attribute).toEqual(expectedFormat)
    })
    it('has collectionItems', () => {
      const getItemByTypeId = (type, id) => {
        if (type === 'physicalObject') {
          return {
            attributes: { lid: '24bf4bb4-f865-4182-a010-34aa898d845d' },
            id,
            resolved: true,
            type,
          }
        }

        return {
          id,
          resolved: true,
          type,
        }
      }

      const nestedSpecimen = coreToNestedSync({
        denormalize: true,
        extractRelationships: true,
        getItemByTypeId,
        item: apiFormatSpecimen,
        type: 'specimen',
      })

      const attribute = nestedSpecimen.individual.collectionItems

      const expectedFormat = [
        {
          alternateIdentifiersText: 'alternateIdentifiersText',
          physicalObject: {
            id: '2234',
            lid: '24bf4bb4-f865-4182-a010-34aa898d845d',
          },
          physicalObjectText: 'physicalObjectText',
          lid: 'f1479610-6618-49e7-b148-8fbaeaacbcdd',
        },
      ]
      expect(attribute).toEqual(expectedFormat)
    })
    it('has determinations', () => {
      const attribute = individual.determinations
      const expectedFormat = [
        {
          determinationVerbatim: 'determinationVerbatim',
          determinedByAgent: { textI: 'determinedByAgentText' },
          remarks: 'remarks',
          taxon: {
            id: '2367',
            type: 'taxon',
          },
          lid: '3a823494-b06f-4202-80c3-a8bf58d2dd40',
        },
      ]
      expect(attribute).toEqual(expectedFormat)
    })
    it('has featureObservations', () => {
      const attribute = individual.featureObservations
      const expectedFormat = [
        {
          featureObservationAgentText: 'featureObservationAgentText',
          featureObservationText: '21',
          featureType: {
            id: '1',
          },
          methodText: 'methodText',
          lid: 'b7973764-992a-4c42-816a-566e2c4ada7e',
        },
      ]
      expect(attribute).toEqual(expectedFormat)
    })
    it('has identifiers', () => {
      const attribute = individual.identifiers
      const expectedFormat = [
        {
          identifierType: {
            id: 1,
          },
          namespace: '',
          value: '123456',
          publishRecord: true,
          remarks: '',
          lid: '34674e21-924c-4c1a-8c91-c15758cce3af',
        },
      ]

      expect(attribute).toEqual(expectedFormat)
    })
    it('has lid', () => {
      const attribute = individual.lid
      const expectedFormat = '6958cbc2-4c47-4bb8-bb56-c60f7c37b79f'

      expect(attribute).toEqual(expectedFormat)
    })
    it('has recordHistoryEvents', () => {
      const attribute = individual.recordHistoryEvents
      const expectedFormat = [
        {
          agent: {
            normalizedAgent: {
              id: '1',
            },
          },
          date: {
            dateText: '2018',
          },
          lid: '35677dc2-73ed-4478-889c-d7fe5f7565c1',
        },
      ]
      expect(attribute).toEqual(expectedFormat)
    })
    it('has taxonInformation', () => {
      const attribute = individual.taxonInformation
      const expectedFormat = {
        lid: '9b6bd5ea-5605-463a-9262-1e83fd618b14',
      }
      expect(attribute).toEqual(expectedFormat)
    })
  })
})
