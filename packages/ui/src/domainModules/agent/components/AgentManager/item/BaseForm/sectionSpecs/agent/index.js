import unitSpecs from '../../unitSpecs'

const { agentBase, agentContactDetails, agentNameDetails } = unitSpecs

const units = [agentBase, agentNameDetails, agentContactDetails]

export default {
  name: 'agent',
  units,
}
