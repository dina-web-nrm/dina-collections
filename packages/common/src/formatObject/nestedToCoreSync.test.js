const nestedToCoreSync = require('./nestedToCoreSync')
const coreNormalizedSpecimenWithNewPhysicalObject = require('./utilities/testData/coreNormalizedSpecimenWithNewPhysicalObject')
const corePhysicalObject = require('./utilities/testData/corePhysicalObject')
const coreSpecimen = require('./utilities/testData/coreSpecimen')
const nestedDenormalizedSpecimen = require('./utilities/testData/nestedDenormalizedSpecimen')
const nestedNormalizedSpecimenWithNewPhysicalObject = require('./utilities/testData/nestedNormalizedSpecimenWithNewPhysicalObject')
const nestedPhysicalObjectWithRelationships = require('./utilities/testData/nestedPhysicalObjectWithRelationships')
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
        denormalize: true,
        extractRelationships: true,
        item: undefined,
        type: 'specimen',
      })
    ).toEqual(undefined)

    expect(
      nestedToCoreSync({
        denormalize: true,
        extractRelationships: true,
        item: null,
        type: 'specimen',
      })
    ).toEqual(null)
  })

  it('resolves with an item with core (api format) keys', () => {
    const coreItem = nestedToCoreSync({
      extractRelationships: true,
      item: nestedDenormalizedSpecimen,
      normalize: true,
      type: 'specimen',
    })

    expect(Object.keys(coreItem).sort()).toEqual([
      'attributes',
      'id',
      'relationships',
      'type',
    ])
  })

  it('returns non-normalized item with core (api format) keys', () => {
    const testValue = nestedToCoreSync({
      extractRelationships: true,
      item: nestedPhysicalObjectWithRelationships,
      normalize: false,
      type: 'physicalObject',
    })
    const expectedResult = corePhysicalObject

    expect(testValue).toEqual(expectedResult)
  })

  it('normalizes and transforms item and returns core (api format) keys', () => {
    const coreItem = nestedToCoreSync({
      extractRelationships: true,
      item: nestedDenormalizedSpecimen,
      normalize: true,
      type: 'specimen',
    })
    const coreKeys = Object.keys(coreItem).sort()
    expect(coreKeys).toEqual(['attributes', 'id', 'relationships', 'type'])
  })

  it('transforms item and returns core (api format) keys', () => {
    const testValue = nestedToCoreSync({
      extractRelationships: true,
      item: nestedNormalizedSpecimenWithNewPhysicalObject,
      normalize: true,
      type: 'specimen',
    })
    const expectedResult = coreNormalizedSpecimenWithNewPhysicalObject

    expect(testValue).toEqual(expectedResult)
  })

  describe('deeper check of core item format', () => {
    const lidRegEx = /\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/
    let coreItem
    let attributes
    let relationships

    beforeEach(() => {
      coreItem = nestedToCoreSync({
        extractRelationships: true,
        item: nestedDenormalizedSpecimen,
        normalize: true,
        type: 'specimen',
      })

      attributes = coreItem.attributes
      relationships = coreItem.relationships
    })

    it('regex matches lid', () => {
      const lidRegex = /\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/
      expect('d64d0630-b630-44aa-ac59-a8f1662c2756').toMatch(lidRegex)
    })

    it('relationships has expected items', () => {
      expect(relationships).toMatchSnapshot()
      expect(relationships).toMatchObject({
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
        normalizedAgents: {
          data: [
            {
              type: 'normalizedAgent',
              id: '1',
            },
          ],
        },
        physicalObjects: {
          data: [
            {
              type: 'physicalObject',
              id: '2234',
              attributes: {
                lid: '24bf4bb4-f865-4182-a010-34aa898d845d',
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

    fit('has individual lid and normalized object', () => {
      const expectedFormat = {
        individual: expect.stringMatching(lidRegEx),
        normalized: {},
      }

      expect(attributes).toMatchObject(expectedFormat)
    })

    //   it('has matching determinations', () => {
    //     const { determinations } = attributes.normalized
    //     const expectedFormat = [
    //       {
    //         determinationVerbatim: expect.stringMatching('determinationVerbatim'),
    //         determinedByAgent: { textI: 'determinedByAgentText' },
    //         remarks: 'remarks',
    //         taxon: {
    //           id: '2367',
    //           type: 'taxon',
    //         },
    //         lid: expect.stringMatching(lidRegEx),
    //       },
    //     ]

    //     expect(determinations).toMatchObject(expectedFormat)
    //   })
    //   it('has matching collectingInformation', () => {
    //     const { collectingInformation } = attributes.normalized
    //     const expectedFormat = [
    //       {
    //         collectedByAgent: { textI: 'collectorsText' },
    //         event: expect.stringMatching(lidRegEx),
    //         lid: expect.stringMatching(lidRegEx),
    //       },
    //     ]

    //     expect(collectingInformation).toMatchObject(expectedFormat)
    //   })
    //   it('has matching collectionItems', () => {
    //     const { collectionItems } = attributes.normalized
    //     const expectedFormat = [
    //       {
    //         alternateIdentifiersText: 'alternateIdentifiersText',
    //         physicalObject: {
    //           id: '2234',
    //         },
    //         physicalObjectText: 'physicalObjectText',
    //         lid: expect.stringMatching(lidRegEx),
    //       },
    //     ]

    //     expect(collectionItems).toMatchObject(expectedFormat)
    //   })
    //   it('has matching determinations', () => {
    //     const { determinations } = attributes.normalized
    //     const expectedFormat = [
    //       {
    //         determinationVerbatim: expect.stringMatching('determinationVerbatim'),
    //         determinedByAgent: { textI: 'determinedByAgentText' },
    //         remarks: 'remarks',
    //         taxon: {
    //           id: '2367',
    //           type: 'taxon',
    //         },
    //         lid: expect.stringMatching(lidRegEx),
    //       },
    //     ]

    //     expect(determinations).toMatchObject(expectedFormat)
    //   })
    //   it('has matching events', () => {
    //     const { events } = attributes.normalized
    //     const expectedFormat = [
    //       {
    //         endDate: 'endDate',
    //         expeditionText: 'expeditionText',
    //         locationInformation: {
    //           coordinatesVerbatim: 'coordinatesVerbatim',
    //           places: [
    //             {
    //               id: '1',
    //             },
    //             {
    //               id: '2',
    //             },
    //             {
    //               id: '3',
    //             },
    //             {
    //               id: '4',
    //             },
    //             {
    //               id: '5',
    //             },
    //           ],
    //           georeferenceSourcesText: 'georeferenceSourcesText',
    //           localityVerbatim: 'localityVerbatim',
    //           position: {
    //             geodeticDatum: 'geodeticDatum text',
    //             latitude: 'latitude-string',
    //             longitude: 'longitude-string',
    //             uncertaintyInMeters: 10,
    //           },
    //           remarks: 'remarks',
    //           verticalPosition: {
    //             maximumDepthInMeters: 100,
    //             maximumElevationInMeters: 100,
    //             minimumDepthInMeters: 20,
    //             minimumElevationInMeters: 20,
    //           },
    //         },
    //         lid: expect.stringMatching(lidRegEx),
    //       },
    //     ]

    //     expect(events).toMatchObject(expectedFormat)
    //   })
    //   it('has matching featureObservations', () => {
    //     const { featureObservations } = attributes.normalized
    //     const expectedFormat = [
    //       {
    //         featureObservationAgentText: 'featureObservationAgentText',
    //         featureObservationText: '21',
    //         featureType: {
    //           id: '1',
    //         },
    //         methodText: 'methodText',
    //         lid: expect.stringMatching(lidRegEx),
    //       },
    //     ]

    //     expect(featureObservations).toMatchObject(expectedFormat)
    //   })
    //   it('has matching identifiers', () => {
    //     const { identifiers } = attributes.normalized
    //     const expectedFormat = [
    //       {
    //         identifierType: {
    //           id: 1,
    //         },
    //         namespace: '',
    //         value: '123456',
    //         publishRecord: true,
    //         remarks: '',
    //         lid: expect.stringMatching(lidRegEx),
    //       },
    //     ]

    //     expect(identifiers).toMatchObject(expectedFormat)
    //   })
    //   it('has matching individuals', () => {
    //     const { individuals } = attributes.normalized
    //     const expectedFormat = [
    //       {
    //         determinations: expect.arrayContaining([
    //           expect.stringMatching(lidRegEx),
    //         ]),
    //         recordHistoryEvents: expect.arrayContaining([
    //           expect.stringMatching(lidRegEx),
    //         ]),
    //         taxonInformation: expect.stringMatching(lidRegEx),
    //         featureObservations: expect.arrayContaining([
    //           expect.stringMatching(lidRegEx),
    //         ]),
    //         collectionItems: expect.arrayContaining([
    //           expect.stringMatching(lidRegEx),
    //         ]),
    //         identifiers: expect.arrayContaining([
    //           expect.stringMatching(lidRegEx),
    //         ]),
    //         collectingInformation: expect.arrayContaining([
    //           expect.stringMatching(lidRegEx),
    //         ]),
    //         lid: expect.stringMatching(lidRegEx),
    //       },
    //     ]

    //     expect(individuals).toMatchObject(expectedFormat)
    //   })
    //   it('has matching recordHistoryEvents', () => {
    //     const { recordHistoryEvents } = attributes.normalized
    //     const expectedFormat = [
    //       {
    //         agent: {
    //           normalized: {
    //             id: '1',
    //           },
    //         },
    //         date: {
    //           dateText: '2018',
    //         },
    //         lid: expect.stringMatching(lidRegEx),
    //       },
    //     ]

    //     expect(recordHistoryEvents).toMatchObject(expectedFormat)
    //   })
    it('has matching taxonInformation', () => {
      const { taxonInformation } = attributes.individual
      console.log('attributes.individual', attributes.individual)
      const expectedFormat = [
        {
          lid: expect.stringMatching(lidRegEx),
        },
      ]

      expect(taxonInformation).toMatchObject(expectedFormat)
    })
  })
})
