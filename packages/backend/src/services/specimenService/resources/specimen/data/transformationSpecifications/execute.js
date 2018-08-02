// TODO make it possible for bulkCreate to create its own ids and then remove this
let physicalObjectId = 0

module.exports = function execute({ models, items, reporter }) {
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

  if (reporter) {
    reporter.rebuildViewIncrementCustom({
      items: mappedPhysicalObjects,
      scope: 'nTargetPhysicalObjects',
    })
  }

  return models.physicalObject
    .bulkCreate({ items: mappedPhysicalObjects })
    .then(() => {
      return specimensWithPhysicalObjects
    })

    .then(mappedSpecimens => {
      const specimens = mappedSpecimens.map(
        ({ attributes, id, relationships }) => {
          return {
            attributes: { ...attributes, relationships },
            id,
          }
        }
      )

      return models.specimen.bulkCreate({ items: specimens })
    })
}
