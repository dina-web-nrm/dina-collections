const nestedToCoreSync = require('./nestedToCoreSync')
const nestedSpecimen = require('./utilities/testData/nestedSpecimen')
const nestedPhysicalObject = require('./utilities/testData/nestedPhysicalObject')

/* eslint-disable prefer-destructuring, sort-keys */
describe('formatObject/nestedToCoreSync', () => {
  it('is a function', () => {
    expect(typeof nestedToCoreSync).toBe('function')
  })

  it('throws if item is string', () => {
    expect(() => nestedToCoreSync({ item: '' })).toThrow(
      'item must not be a string'
    )
  })

  it('returns item when item is falsy', () => {
    expect(
      nestedToCoreSync({
        extractRelationships: true,
        item: undefined,
        normalize: false,
        type: 'specimen',
      })
    ).toEqual(undefined)

    expect(
      nestedToCoreSync({
        extractRelationships: true,
        item: null,
        normalize: false,
        type: 'specimen',
      })
    ).toEqual(null)
  })

  it('returns core physical object', () => {
    const coreItem = nestedToCoreSync({
      extractRelationships: true,
      item: nestedPhysicalObject,
      normalize: false,
      type: 'physicalObject',
    })
    expect(coreItem).toMatchSnapshot()
  })

  it('returns core specimen', () => {
    const coreItem = nestedToCoreSync({
      extractRelationships: true,
      item: nestedSpecimen,
      normalize: false,
      type: 'specimen',
    })
    expect(coreItem).toMatchSnapshot()
  })

  describe('deeper check of core item format', () => {
    let coreItem
    let attributes
    let relationships

    beforeEach(() => {
      coreItem = nestedToCoreSync({
        extractRelationships: true,
        item: nestedSpecimen,
        normalize: false,
        type: 'specimen',
      })

      attributes = coreItem.attributes
      relationships = coreItem.relationships
    })

    it('relationships has expected items', () => {
      expect(relationships).toEqual({
        causeOfDeathTypes: {
          data: [],
        },
        establishmentMeansTypes: {
          data: [],
        },
        featureTypes: {
          data: [
            {
              type: 'featureType',
              id: '1',
            },
          ],
        },
        identifierTypes: {
          data: [
            {
              type: 'identifierType',
              id: '1',
            },
          ],
        },
        normalizedAgents: {
          data: [
            {
              type: 'normalizedAgent',
              id: '1',
              relationships: {
                resourceActivities: {
                  data: [],
                },
                specimens: {
                  data: [],
                },
              },
            },
          ],
        },
        physicalObjects: {
          data: [
            {
              type: 'physicalObject',
              id: '2234',
              relationships: {
                resourceActivities: {
                  data: [],
                },
                specimens: {
                  data: [],
                },
              },
            },
          ],
        },
        places: {
          data: [
            {
              type: 'place',
              id: '1',
              relationships: {
                children: {
                  data: [],
                },
                resourceActivities: {
                  data: [],
                },
                specimens: {
                  data: [],
                },
              },
            },
            {
              type: 'place',
              id: '2',
              relationships: {
                children: {
                  data: [],
                },
                resourceActivities: {
                  data: [],
                },
                specimens: {
                  data: [],
                },
              },
            },
            {
              type: 'place',
              id: '3',
              relationships: {
                children: {
                  data: [],
                },
                resourceActivities: {
                  data: [],
                },
                specimens: {
                  data: [],
                },
              },
            },
            {
              type: 'place',
              id: '4',
              relationships: {
                children: {
                  data: [],
                },
                resourceActivities: {
                  data: [],
                },
                specimens: {
                  data: [],
                },
              },
            },
            {
              type: 'place',
              id: '5',
              relationships: {
                children: {
                  data: [],
                },
                resourceActivities: {
                  data: [],
                },
                specimens: {
                  data: [],
                },
              },
            },
          ],
        },
        preparationTypes: {
          data: [],
        },
        resourceActivities: {
          data: [],
        },
        taxa: {
          data: [
            {
              id: '500',
              type: 'taxon',
              relationships: {
                children: { data: [] },
                resourceActivities: { data: [] },
                specimens: { data: [] },
                storageLocations: { data: [] },
                synonyms: { data: [] },
                vernacularNames: { data: [] },
              },
            },
          ],
        },
        taxonNames: {
          data: [],
        },
      })
    })

    it('has matching determinations', () => {
      const { determinations } = attributes.individual
      expect(determinations).toEqual([
        {
          determinationVerbatim: 'determinationVerbatim',
          determinedByAgent: {
            textI: 'determinedByAgentText',
          },
          remarks: 'remarks',
          taxonNameI: 'Sorex minutus',
        },
      ])
    })

    it('has matching collectingInformation', () => {
      const { collectingInformation } = attributes.individual
      expect(collectingInformation).toEqual([
        {
          collectedByAgent: {
            textI: 'collectorsText',
          },
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
      ])
    })

    it('has matching collectionItems', () => {
      const { collectionItems } = attributes.individual
      expect(collectionItems).toEqual([
        {
          alternateIdentifiersText: 'alternateIdentifiersText',
          physicalObject: {
            id: '2234',
          },
          physicalObjectText: 'physicalObjectText',
        },
      ])
    })

    it('has matching collectingInformation', () => {
      const { collectingInformation } = attributes.individual
      expect(collectingInformation).toEqual([
        {
          collectedByAgent: {
            textI: 'collectorsText',
          },
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
      ])
    })

    it('has matching featureObservations', () => {
      const { featureObservations } = attributes.individual
      expect(featureObservations).toEqual([
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

    it('has matching identifiers', () => {
      const { identifiers } = attributes.individual
      expect(identifiers).toEqual([
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

    it('has matching recordHistoryEvents', () => {
      const { recordHistoryEvents } = attributes.individual
      expect(recordHistoryEvents).toMatchObject([
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

    it('has matching taxonInformation', () => {
      const { taxonInformation } = attributes.individual
      expect(taxonInformation).toEqual({
        curatorialTaxon: {
          id: '500',
        },
      })
    })
  })
})
