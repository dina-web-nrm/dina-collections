const coreToNested = require('./coreToNested')
const apiFormatSpecimen = require('./utilities/testData/apiFormatSpecimen')

/* eslint-disable sort-keys */
describe('formatObject/coreToNested', () => {
  it('is a function', () => {
    expect(typeof coreToNested).toBe('function')
  })

  let getItemByTypeId
  beforeEach(() => {
    getItemByTypeId = (type, id) => {
      return Promise.resolve().then(() => {
        if (type === 'identifierType') {
          return {
            attributes: {
              key: 'catalog-number',
              name: 'catalog number',
            },
            id,

            type,
          }
        }

        if (type === 'physicalObject') {
          return {
            attributes: { lid: '24bf4bb4-f865-4182-a010-34aa898d845d' },
            id,

            type,
          }
        }

        return {
          attributes: {},
          id,
          type,
        }
      })
    }
  })

  it('returns a promise, i.e. an object with a then() method', () => {
    expect(
      typeof coreToNested({
        denormalize: true,
        extractRelationships: true,
        getItemByTypeId,
        item: apiFormatSpecimen,
        type: 'specimen',
      }).then
    ).toBe('function')
  })
  it('resolves falsy item', () => {
    const item = null
    expect.assertions(1)
    return coreToNested({
      denormalize: true,
      extractRelationships: true,
      getItemByTypeId,
      item,
      type: 'specimen',
    }).then(res => {
      expect(res).toBe(null)
    })
  })

  describe('deeper check of denormalized nested item format', () => {
    let individual
    beforeEach(() => {
      return coreToNested({
        denormalize: true,
        extractRelationships: true,
        getItemByTypeId,
        item: apiFormatSpecimen,
        type: 'specimen',
      }).then(nestedItem => {
        individual = nestedItem.individual // eslint-disable-line prefer-destructuring
      })
    })

    it('resolves with an item with nested keys', () => {
      expect.assertions(1)
      return coreToNested({
        denormalize: true,
        extractRelationships: true,
        getItemByTypeId,
        item: apiFormatSpecimen,
        type: 'specimen',
      }).then(item => {
        expect(Object.keys(item).sort()).toEqual(['id', 'individual'])
      })
    })
    it('has collectingInformation', () => {
      const attribute = individual.collectingInformation
      const expectedFormat = [
        {
          collectorsText: 'collectorsText',
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
      const attribute = individual.collectionItems

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
          determinedByAgentText: 'determinedByAgentText',
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
            key: 'catalog-number',
            name: 'catalog number',
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
            id: '1',
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
