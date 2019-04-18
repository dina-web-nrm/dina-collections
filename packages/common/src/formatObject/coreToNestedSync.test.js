const coreToNestedSync = require('./coreToNestedSync')
const corePhysicalObject = require('./utilities/testData/corePhysicalObject')
const coreSpecimen = require('./utilities/testData/coreSpecimen')
const nestedPhysicalObjectWithRelationships = require('./utilities/testData/nestedPhysicalObjectWithRelationships')

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
        denormalize: true,
        extractRelationships: true,
        item: undefined,
        type: 'specimen',
      })
    ).toEqual(undefined)

    expect(
      coreToNestedSync({
        denormalize: true,
        extractRelationships: true,
        item: null,
        type: 'specimen',
      })
    ).toEqual(null)
  })

  it('returns denormalized item with nested item keys', () => {
    const nestedItem = coreToNestedSync({
      denormalize: true,
      extractRelationships: true,
      getItemByTypeId,
      item: coreSpecimen,
      type: 'specimen',
    })
    const nestedItemKeys = Object.keys(nestedItem).sort()
    expect(nestedItemKeys).toEqual(['id', 'individual', 'normalized'])
  })

  it('returns non-denormalized item with expected content', () => {
    const testValue = coreToNestedSync({
      denormalize: false,
      extractRelationships: true,
      getItemByTypeId,
      item: corePhysicalObject,
      type: 'physicalObject',
    })

    const expectedResult = nestedPhysicalObjectWithRelationships

    expect(testValue).toEqual(expectedResult)
  })

  describe('deeper check of denormalized nested item format', () => {
    let nestedItem
    let individual
    let normalizedAttributes

    beforeEach(() => {
      nestedItem = coreToNestedSync({
        denormalize: true,
        extractRelationships: true,
        getItemByTypeId,
        item: coreSpecimen,
        type: 'specimen',
      })

      individual = nestedItem.individual
      normalizedAttributes = nestedItem.normalized
    })

    it('has expected attribute keys', () => {
      const attributeKeys = Object.keys(normalizedAttributes).sort()
      expect(attributeKeys).toEqual([
        'collectingInformation',
        'collectionItems',
        'determinations',
        'events',
        'featureObservations',
        'identifiers',
        'individuals',
        'recordHistoryEvents',
        'taxonInformation',
      ])
    })

    it('has collectingInformation', () => {
      const { collectingInformation, events } = normalizedAttributes
      const eventLid = 'd61ec620-e5df-4141-8691-a0fe42ec0c5b'

      const expectedCollectingInformation = [
        {
          collectedByAgent: { textI: 'collectorsText' },
          event: eventLid,
          lid: '06c5b25b-13dd-4c27-8bc2-18723fb1beb3',
        },
      ]

      const expectedEvent = {
        endDate: 'endDate',
        expeditionText: 'expeditionText',
        lid: eventLid,
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
      }

      expect(collectingInformation).toEqual(expectedCollectingInformation)
      expect(events).toContainEqual(expectedEvent)
    })

    it('has collectionItems', () => {
      getItemByTypeId = (type, id) => {
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
        item: coreSpecimen,
        type: 'specimen',
      })

      expect(nestedSpecimen.normalized.collectionItems).toEqual([
        {
          alternateIdentifiersText: 'alternateIdentifiersText',
          physicalObject: {
            lid: '24bf4bb4-f865-4182-a010-34aa898d845d',
          },
          physicalObjectText: 'physicalObjectText',
          lid: 'f1479610-6618-49e7-b148-8fbaeaacbcdd',
        },
      ])
    })

    it('has determinations', () => {
      expect(normalizedAttributes.determinations).toEqual([
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
      ])
    })

    it('has featureObservations', () => {
      expect(normalizedAttributes.featureObservations).toEqual([
        {
          featureObservationAgentText: 'featureObservationAgentText',
          featureObservationText: '21',
          featureType: {
            id: '1',
          },
          methodText: 'methodText',
          lid: 'b7973764-992a-4c42-816a-566e2c4ada7e',
        },
      ])
    })

    it('has identifiers', () => {
      expect(normalizedAttributes.identifiers).toEqual([
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
      ])
    })

    it('has lid', () => {
      expect(individual).toEqual('6958cbc2-4c47-4bb8-bb56-c60f7c37b79f')
    })

    it('has recordHistoryEvents', () => {
      const attribute = normalizedAttributes.recordHistoryEvents
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
      expect(normalizedAttributes.taxonInformation).toEqual([
        {
          lid: '9b6bd5ea-5605-463a-9262-1e83fd618b14',
        },
      ])
    })
  })
})
