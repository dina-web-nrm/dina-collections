const nestedToCoreSync = require('./nestedToCoreSync')
const denormalizedSpecimen = require('./utilities/testData/denormalizedSpecimen')

/* eslint-disable sort-keys */
describe('formatObject/nestedToCoreSync', () => {
  test('is a function', () => {
    expect(typeof nestedToCoreSync).toBe('function')
  })

  test('returns item with core (api format) keys', () => {
    const coreItem = nestedToCoreSync({
      extractRelationships: true,
      item: denormalizedSpecimen,
      normalize: true,
      type: 'specimen',
    })
    const coreKeys = Object.keys(coreItem).sort()
    expect(coreKeys).toEqual(['attributes', 'id', 'relationships', 'type'])
  })

  describe('deeper check of core item format', () => {
    let coreItem
    let attributes
    let lidRegEx
    beforeEach(() => {
      coreItem = nestedToCoreSync({
        extractRelationships: true,
        item: denormalizedSpecimen,
        normalize: true,
        type: 'specimen',
      })

      attributes = coreItem.attributes // eslint-disable-line prefer-destructuring
      lidRegEx = /\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/
    })

    test('regex matches lid', () => {
      const lidRegex = /\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/
      expect('d64d0630-b630-44aa-ac59-a8f1662c2756').toMatch(lidRegex)
    })

    test('relationships has expected items', () => {
      const { relationships } = coreItem
      expect(relationships).toEqual({
        agents: {
          data: [
            {
              type: 'agent',
              id: '1',
            },
          ],
        },
        featureTypes: {
          data: [
            {
              type: 'featureType',
              id: '1',
              attributes: {
                type: 'featureType',
              },
            },
          ],
        },
        identifierTypes: {
          data: [
            {
              type: 'identifierType',
              id: 1,
            },
          ],
        },
        physicalObjects: {
          data: [
            {
              type: 'physicalObject',
              id: '2234',
              attributes: {
                type: 'physicalObject',
              },
            },
          ],
        },
        places: {
          data: [
            {
              type: 'place',
              id: '1',
              attributes: {
                type: 'place',
              },
            },
            {
              type: 'place',
              id: '2',
              attributes: {
                type: 'place',
              },
            },
            {
              type: 'place',
              id: '3',
              attributes: {
                type: 'place',
              },
            },
            {
              type: 'place',
              id: '4',
              attributes: {
                type: 'place',
              },
            },
            {
              type: 'place',
              id: '5',
              attributes: {
                type: 'place',
              },
            },
          ],
        },
      })
    })

    test('has individual lid and normalized object', () => {
      const expectedFormat = {
        individual: expect.stringMatching(lidRegEx),
        normalized: {},
      }

      expect(attributes).toMatchObject(expectedFormat)
    })

    test('has matching determinations', () => {
      const { determinations } = attributes.normalized
      const expectedFormat = [
        {
          determinationVerbatim: expect.stringMatching('determinationVerbatim'),
          determinedByAgentText: 'determinedByAgentText',
          remarks: 'remarks',
          taxon: {
            id: '2367',
            type: 'taxon',
          },
          lid: expect.stringMatching(lidRegEx),
        },
      ]

      expect(determinations).toMatchObject(expectedFormat)
    })
    test('has matching collectingInformation', () => {
      const { collectingInformation } = attributes.normalized
      const expectedFormat = [
        {
          collectorsText: 'collectorsText',
          event: expect.stringMatching(lidRegEx),
          lid: expect.stringMatching(lidRegEx),
        },
      ]

      expect(collectingInformation).toMatchObject(expectedFormat)
    })
    test('has matching collectionItems', () => {
      const { collectionItems } = attributes.normalized
      const expectedFormat = [
        {
          alternateIdentifiersText: 'alternateIdentifiersText',
          physicalObject: {
            id: '2234',
          },
          physicalObjectText: 'physicalObjectText',
          lid: expect.stringMatching(lidRegEx),
        },
      ]

      expect(collectionItems).toMatchObject(expectedFormat)
    })
    test('has matching determinations', () => {
      const { determinations } = attributes.normalized
      const expectedFormat = [
        {
          determinationVerbatim: expect.stringMatching('determinationVerbatim'),
          determinedByAgentText: 'determinedByAgentText',
          remarks: 'remarks',
          taxon: {
            id: '2367',
            type: 'taxon',
          },
          lid: expect.stringMatching(lidRegEx),
        },
      ]

      expect(determinations).toMatchObject(expectedFormat)
    })
    test('has matching events', () => {
      const { events } = attributes.normalized
      const expectedFormat = [
        {
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
          lid: expect.stringMatching(lidRegEx),
        },
      ]

      expect(events).toMatchObject(expectedFormat)
    })
    test('has matching featureObservations', () => {
      const { featureObservations } = attributes.normalized
      const expectedFormat = [
        {
          featureObservationAgentText: 'featureObservationAgentText',
          featureObservationText: '21',
          featureType: {
            id: '1',
          },
          methodText: 'methodText',
          lid: expect.stringMatching(lidRegEx),
        },
      ]

      expect(featureObservations).toMatchObject(expectedFormat)
    })
    test('has matching identifiers', () => {
      const { identifiers } = attributes.normalized
      const expectedFormat = [
        {
          identifierType: {
            id: 1,
          },
          nameSpace: '',
          value: '123456',
          publishRecord: true,
          remarks: '',
          lid: expect.stringMatching(lidRegEx),
        },
      ]

      expect(identifiers).toMatchObject(expectedFormat)
    })
    test('has matching individuals', () => {
      const { individuals } = attributes.normalized
      const expectedFormat = [
        {
          determinations: expect.arrayContaining([
            expect.stringMatching(lidRegEx),
          ]),
          recordHistoryEvents: expect.arrayContaining([
            expect.stringMatching(lidRegEx),
          ]),
          taxonInformation: expect.stringMatching(lidRegEx),
          featureObservations: expect.arrayContaining([
            expect.stringMatching(lidRegEx),
          ]),
          collectionItems: expect.arrayContaining([
            expect.stringMatching(lidRegEx),
          ]),
          identifiers: expect.arrayContaining([
            expect.stringMatching(lidRegEx),
          ]),
          collectingInformation: expect.arrayContaining([
            expect.stringMatching(lidRegEx),
          ]),
          lid: expect.stringMatching(lidRegEx),
        },
      ]

      expect(individuals).toMatchObject(expectedFormat)
    })
    test('has matching recordHistoryEvents', () => {
      const { recordHistoryEvents } = attributes.normalized
      const expectedFormat = [
        {
          agent: {
            id: '1',
          },
          date: {
            dateText: '2018',
          },
          lid: expect.stringMatching(lidRegEx),
        },
      ]

      expect(recordHistoryEvents).toMatchObject(expectedFormat)
    })
    test('has matching taxonInformation', () => {
      const { taxonInformation } = attributes.normalized
      const expectedFormat = [
        {
          lid: expect.stringMatching(lidRegEx),
        },
      ]

      expect(taxonInformation).toMatchObject(expectedFormat)
    })
  })
})
