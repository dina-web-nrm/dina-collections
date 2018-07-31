// same as in transformationSpecifications for lookupAgent
const COLLIDING_ID_PREFIX = 'x'

module.exports = function getCollectorAgent({
  getItemByTypeId,
  src,
  migrator,
}) {
  const collector = migrator.getValue({
    obj: src,
    path: 'objects.Collector(Leg)',
  })

  if (!collector) {
    return Promise.resolve(undefined)
  }

  return getItemByTypeId({
    id: collector,
    type: 'lookupAgent',
  }).then(agent => {
    if (!agent) {
      return undefined
    }

    return getItemByTypeId({
      id: `${COLLIDING_ID_PREFIX}${collector}`,
      report: false,
      type: 'lookupAgent',
    }).then(duplicate => {
      return {
        collector,
        duplicate: !!duplicate,
        id: agent.attributes.srcId,
      }
    })
  })
}
