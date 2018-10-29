import unitSpecs from '../../unitSpecs'

const {
  agentBase,
  agentBirthAndDeath,
  agentContactDetails,
  agentNameDetails,
} = unitSpecs

const units = [
  agentBase,
  agentNameDetails,
  agentContactDetails,
  agentBirthAndDeath,
]

export default {
  name: 'agent',
  units,
}
