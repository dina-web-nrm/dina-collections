const {
  bulkCreateResourceActivities,
} = require('../../../../historyService/serviceInteractions')

// TODO make it possible for bulkCreate to create its own ids and then remove this
let physicalObjectId = 0

module.exports = function execute({
  items,
  models,
  reporter,
  serviceInteractor,
}) {
  const coreSpecimens = items.filter(item => {
    if (!item) {
      return false
    }

    if (!(item.id || item.attributes)) {
      return false
    }

    return true
  })
  if (reporter) {
    reporter.rebuildViewIncrementTarget({ items: coreSpecimens })
  }

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

          const internals = {}

          const storageLocationId =
            corePhysicalObject.relationships &&
            corePhysicalObject.relationships.storageLocation &&
            corePhysicalObject.relationships.storageLocation.data &&
            corePhysicalObject.relationships.storageLocation.data.id
          if (storageLocationId !== undefined) {
            internals.storageLocationId = storageLocationId
          }

          // TODO: change to sql key storageLocationId instead of having
          // storageLocation in doc
          return mappedPhysicalObjects.push({
            attributes: corePhysicalObject.attributes,
            id: physicalObjectId,
            internals,
          })
        }
      )
    }
  })

  if (reporter) {
    reporter.rebuildViewIncrementCustom({
      items: mappedPhysicalObjects,
      scope: 'nTargetPhysicalObjects',
    })
  }
  return models.physicalObject
    .bulkCreate({ items: mappedPhysicalObjects })
    .then(({ items: createdPhysicalObjects }) => {
      return bulkCreateResourceActivities({
        // user,
        action: 'create',
        includeDiff: false,
        includeSnapshot: true,
        items: createdPhysicalObjects,
        resource: 'physicalObject',
        service: 'specimenService',
        serviceInteractor,
      }).then(() => {
        return specimensWithPhysicalObjects
      })
    })

    .then(mappedSpecimens => {
      const specimens = mappedSpecimens.map(
        ({ attributes, id, relationships }) => {
          return {
            attributes: { ...attributes },
            id,
            relationships,
          }
        }
      )

      return models.specimen
        .bulkCreate({ items: specimens })
        .then(({ items: createdSpecimens }) => {
          const resourceActivityItems = createdSpecimens.map((item, index) => {
            const { meta } = mappedSpecimens[index]
            if (!(meta && meta.sourceData)) {
              return item
            }

            return {
              ...item,
              meta: {
                ...(item.meta || {}),
                sourceData: meta.sourceData,
              },
            }
          })

          return bulkCreateResourceActivities({
            // user,
            action: 'create',
            includeDiff: false,
            includeSnapshot: true,
            items: resourceActivityItems,
            resource: 'specimen',
            service: 'specimenService',
            serviceInteractor,
          })
        })
    })
}
