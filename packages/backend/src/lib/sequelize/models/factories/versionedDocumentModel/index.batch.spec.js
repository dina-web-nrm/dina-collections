const createDb = require('../../../db')
const createModel = require('./index')
const syncModels = require('../../syncModels')
const config = require('../../../../../apps/core/config')

const batchDescribe = require('../../../../../utilities/test/batchDescribe')
const batchExecute = require('../../../../../utilities/test/batchExecute')

const createData = catalogNumber => {
  return {
    data: {
      additionalData: [
        {
          attributes: {
            catalogNumber: '584028',
          },
          type: 'catalogedUnit',
        },
      ],
      attributes: {
        causeOfDeathStandardized: 'Standardized death cause',
        causeOfDeathText: 'Cause of death ',
        featureObservations: [
          {
            featureObservationText: 'A condition at collecting',
            featureType: {
              featureTypeName: 'conditionAtCollecting',
              id: '2',
            },
          },
          {
            featureObservationAgent: 'JD',
            featureObservationDate: 'A date',
            featureObservationText: 'male',
            featureType: {
              featureTypeName: 'sex',
              id: '1',
            },
            methodText: 'method text',
          },
        ],
        identifications: [
          {
            identificationRemarks: 'some remarks',
            identifiedAsVerbatim: 'Sorex minutus',
            identifiedByAgentText: 'Doe, J.',
            identifiedDateText: 'Date text',
            isCurrentIdentification: true,
          },
        ],
        occurrences: [
          {
            collectorsText: 'Bergström, U',
            dayEnd: 15,
            dayStart: 15,
            establishmentMeansStandardized: 'establishmentMeansStandardized',
            expeditionText: 'Vega Expedition',
            isDeathEvent: true,
            localityInformation: {
              coordinatesVerbatim: 'coord-string',
              curatedLocalities: [
                {
                  id: '123',
                },
                {
                  id: '125',
                },
              ],
              georeferenceSourcesText: 'georeferenceSourcesText text',
              localityRemarks: 'localityRemarks text',
              localityVerbatim: 'Some localityVerbatim text',
              position: {
                latitude: 'latitude-string',
                longitude: 'longitude-string',
                uncertaintyInMeters: 10,
              },
              verticalPosition: {
                maximumDepthInMeters: 100,
                maximumElevationInMeters: 100,
                minimumDepthInMeters: 20,
                minimumElevationInMeters: 20,
              },
            },
            monthEnd: 1,
            monthStart: 1,
            occurrenceDateText: '15 jan 1986',
            yearEnd: 1986,
            yearStart: 1986,
          },
        ],
        originStandardized: 'Standardized origin',
        physicalObjects: [
          {
            alternateIdentifiersText: 'alternateIdentifiersText',
            catalogedUnit: {
              catalogNumber: `${catalogNumber}`,
              publishRecord: true,
              storedUnderTaxonName: 'Sorex minutus',
            },
            normalStorageLocationText: 'normalStorageLocationText',
            physicalObjectText: 'physicalObjectText',
          },
        ],
      },
    },
  }
}

const setup = () => {
  return createDb({ config }).then(sequelize => {
    const model = createModel({
      name: 'test',
      schemaModelName: null,
      schemaVersion: '0',
      sequelize,
    })
    return syncModels({
      config,
      modelArray: [
        {
          model,
          name: 'test',
        },
      ],
    }).then(() => {
      return model
    })
  })
}

const maxAllowedTime = 100000

batchDescribe('lib/sequelize/models', () => {
  let model
  describe('createModel batch', () => {
    beforeAll(() => {
      return setup().then(createdModel => {
        model = createdModel
      })
    })

    describe('create', () => {
      it(
        'Creates and returns a simple record',
        () => {
          const createEntry = index => {
            return {
              document: createData(index),
            }
          }

          const execute = batchData => {
            return model.Model.bulkCreate(batchData).then(res => {
              return res
            })
          }

          return batchExecute({
            createEntry,
            execute,
            numberOfEntries: 300000,
            numberOfEntriesEachBatch: 10000,
          }).then(() => {
            expect(1).toBe(1)
          })
        },
        maxAllowedTime
      )
    })
  })
})

// 100k
// 10k each batch
// 90000.batch.execute: 2875.403ms
// console.log console.js:171
//   batch: 28401.806ms

// 100k
// 1k each batch
//   99000.batch.execute: 970.829ms
// console.log console.js:171
//   batch: 32011.944ms
// console.log src/lib/sequelize/models/createModel.batch.spec.js:165
//   test:batch

// 300k
// 1k each batch
// console.log console.js:171
//   290000.batch.execute: 3241.546ms
// console.log console.js:171
//   batch: 85810.160ms
// console.log src/lib/sequelize/models/createModel.batch.spec.js:165
//   test:batch

// 100k
// 100k each batch - heap out of memory
