// same as in transformationSpecifications for lookupNormalizedAgent
const COLLIDING_ID_PREFIX = 'x'

module.exports = function getCollectorAgent({
  getItemByTypeId,
  src,
  migrator,
}) {
  const collector = migrator.getValue({
    obj: src,
    path: 'objects.Collector(Leg)',
    strip: true,
  })

  if (!collector) {
    return Promise.resolve(undefined)
  }

  return getItemByTypeId({
    id: collector,
    type: 'lookupNormalizedAgent',
  }).then(agent => {
    if (!agent) {
      return undefined
    }

    return getItemByTypeId({
      id: `${COLLIDING_ID_PREFIX}${collector}`,
      report: false,
      type: 'lookupNormalizedAgent',
    }).then(duplicate => {
      return {
        collector,
        duplicate: !!duplicate,
        id: agent.attributes.srcId,
      }
    })
  })
}
