const { execute: batchExecute } = require('common/src/batch')
const readInitialData = require('../../../../utilities/readInitialData')

const migrateSpecimen = require('./migrations/migrateSpecimen')
const createReporter = require('./migrations/reporterFactory')

module.exports = function loadInitialData({ config, models }) {
  const reporter = createReporter()
  reporter.start()
  const {
    initialData: { numberOfSpecimens: numberOfSpecimensInput } = {},
  } = config

  const specimenTemplate = readInitialData('specimens')
  if (!specimenTemplate) {
    return Promise.resolve()
  }
  const numberOfSpecimens = Math.min(
    numberOfSpecimensInput,
    specimenTemplate.length
  )

  const createEntry = index => {
    return specimenTemplate[index % specimenTemplate.length]
  }

  let physicalObjectId = 0
  let specimenId = 0
  return batchExecute({
    createEntry,
    execute: items => {
      return Promise.all(
        items.map(rawSpecimen => {
          const migratedCoreSpecimen = migrateSpecimen({
            reporter,
            specimen: rawSpecimen,
          })

          return migratedCoreSpecimen
        })
      )
        .then(coreSpecimens => {
          // to be used in later then() when creating specimens
          const specimensWithPhysicalObjects = [...coreSpecimens]

          const mappedPhysicalObjects = []

          coreSpecimens.forEach(({ relationships }, specimenIndex) => {
            if (
              relationships &&
              relationships.physicalObjects &&
              relationships.physicalObjects.data &&
              relationships.physicalObjects.data.length
            ) {
              relationships.physicalObjects.data.forEach(
                (corePhysicalObject, physicalObjectIndex) => {
                  physicalObjectId += 1

                  // replace core format with JSON API format for specimens to be created
                  specimensWithPhysicalObjects[
                    specimenIndex
                  ].relationships.physicalObjects.data[physicalObjectIndex] = {
                    id: `${physicalObjectId}`,
                    type: 'physicalObject',
                  }

                  // TODO: change to sql key storageLocationId instead of having
                  // storageLocation in doc
                  return mappedPhysicalObjects.push({
                    attributes: corePhysicalObject.attributes,
                    id: physicalObjectId,
                  })
                }
              )
            }
          })

          return models.physicalObject
            .bulkCreate({ items: mappedPhysicalObjects })
            .then(() => {
              return specimensWithPhysicalObjects
            })
        })
        .then(mappedSpecimens => {
          const specimens = mappedSpecimens.map(
            ({ attributes, relationships }) => {
              specimenId += 1
              return {
                attributes: { ...attributes, relationships },
                id: specimenId,
              }
            }
          )

          return models.specimen.bulkCreate({ items: specimens })
        })
    },
    numberOfEntries: numberOfSpecimens,
    numberOfEntriesEachBatch: 1000,
  }).then(result => {
    reporter.done()
    return result
  })
}
