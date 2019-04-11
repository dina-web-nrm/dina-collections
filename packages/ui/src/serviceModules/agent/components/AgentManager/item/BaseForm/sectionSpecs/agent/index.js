import {
  legacyData,
  recordHistoryEvents,
} from 'coreModules/form/components/units'
import unitSpecs from '../../unitSpecs'

const {
  agentRoot,
  agentBirthAndDeath,
  agentContactDetails,
  agentNameDetails,
  agentRoles,
} = unitSpecs

const units = [
  agentRoot,
  agentNameDetails,
  agentRoles,
  agentContactDetails,
  agentBirthAndDeath,
  recordHistoryEvents,
  legacyData,
]

export default {
  name: 'agent',
  units,
}
