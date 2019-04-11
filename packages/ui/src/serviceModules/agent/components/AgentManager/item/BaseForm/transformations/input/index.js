export default function transformInput({ agent = {} }) {
  const transformedAgent = JSON.parse(JSON.stringify(agent))

  if (!transformedAgent.agentType) {
    transformedAgent.agentType = 'person'
  }
  return transformedAgent
}
