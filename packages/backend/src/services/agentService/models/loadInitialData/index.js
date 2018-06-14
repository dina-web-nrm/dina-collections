const readInitialData = require('../../../../utilities/readInitialData')
const deleteNullProperties = require('common/src/deleteNullProperties')

module.exports = function loadInitialData({ models }) {
  const agents = readInitialData('agents')

  const agentItems = !agents
    ? null
    : agents.map((agent, index) => {
        const { id, ...rest } = agent

        return {
          doc: deleteNullProperties(rest),
          id: `${index + 1}`,
        }
      })

  const agentItemsPromise = agentItems
    ? models.agent.bulkCreate({ items: agentItems })
    : Promise.resolve()

  return Promise.all([agentItemsPromise])
}
