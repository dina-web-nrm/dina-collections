const coreToNestedSync = require('./coreToNestedSync')
const coreSpecimen = require('./utilities/testData/coreSpecimen')

/* eslint-disable prefer-destructuring, sort-keys */
describe('formatObject/coreToNestedSync', () => {
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

  it('is a function', () => {
    expect(typeof coreToNestedSync).toBe('function')
  })

  it('returns item when item is falsy', () => {
    expect(
      coreToNestedSync({
        denormalize: false,
        extractRelationships: true,
        item: undefined,
        type: 'specimen',
      })
    ).toEqual(undefined)

    expect(
      coreToNestedSync({
        denormalize: false,
        extractRelationships: true,
        item: null,
        type: 'specimen',
      })
    ).toEqual(null)
  })

  it('returns nested specimen', () => {
    const nestedSpecimen = coreToNestedSync({
      denormalize: false,
      extractRelationships: true,
      getItemByTypeId,
      item: coreSpecimen,
      type: 'specimen',
    })
    expect(nestedSpecimen).toMatchSnapshot()
  })

  describe('deeper check of nested item format', () => {
    let nestedItem
    let individual

    beforeEach(() => {
      nestedItem = coreToNestedSync({
        denormalize: false,
        extractRelationships: true,
        getItemByTypeId,
        item: coreSpecimen,
        type: 'specimen',
      })

      individual = nestedItem.individual
    })

    it('has expected attribute keys', () => {
      const attributeKeys = Object.keys(individual).sort()
      expect(attributeKeys).toEqual([
        'collectingInformation',
        'collectionItems',
        'determinations',
        'featureObservations',
        'identifiers',
        'recordHistoryEvents',
        'taxonInformation',
      ])
    })

    it('has collectingInformation', () => {
      const { collectingInformation } = individual

      const expectedCollectingInformation = [
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
          },
        },
      ]

      expect(collectingInformation).toEqual(expectedCollectingInformation)
    })

    it('has collectionItems', () => {
      expect(individual.collectionItems).toEqual([
        {
          alternateIdentifiersText: 'alternateIdentifiersText',
          physicalObjectText: 'physicalObjectText',
          physicalObject: { id: '2234' },
        },
      ])
    })

    it('has determinations', () => {
      expect(individual.determinations).toEqual([
        {
          determinationVerbatim: 'determinationVerbatim',
          determinedByAgent: { textI: 'determinedByAgentText' },
          remarks: 'remarks',
          taxonNameI: 'Sorex minutus',
        },
      ])
    })

    it('has featureObservations', () => {
      expect(individual.featureObservations).toEqual([
        {
          featureObservationAgentText: 'featureObservationAgentText',
          featureObservationText: '21',
          featureType: {
            id: '1',
          },
          methodText: 'methodText',
        },
      ])
    })

    it('has identifiers', () => {
      expect(individual.identifiers).toEqual([
        {
          identifierType: {
            id: '1',
          },
          namespace: '',
          value: '123456',
          publishRecord: true,
          remarks: '',
        },
      ])
    })

    it('has recordHistoryEvents', () => {
      expect(individual.recordHistoryEvents).toEqual([
        {
          agent: {
            normalized: {
              id: '1',
            },
          },
          date: {
            dateText: '2018',
          },
        },
      ])
    })

    it('has taxonInformation', () => {
      expect(individual.taxonInformation).toEqual({
        curatorialTaxon: {
          id: '500',
        },
      })
    })
  })
})
