/* eslint-disable no-param-reassign */

module.exports = ({ migrator, src, target }) => {
  const agents = []
  const collectorFullName = migrator.getValue({
    obj: src,
    path: 'individual.collectingInformation.0.collectedByAgent.fullName',
  })

  if (collectorFullName) {
    agents.push(`${collectorFullName} (Collector)`)
  }

  migrator.setValue({
    obj: target,
    path: 'attributes.agents',
    value: agents,
  })
}
