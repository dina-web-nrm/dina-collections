import {
  legacyData,
  recordHistoryEvents,
} from 'coreModules/form/components/units'
import unitSpecs from '../../unitSpecs'

const {
  agentBase,
  agentBirthAndDeath,
  agentContactDetails,
  agentNameDetails,
  agentRoles,
} = unitSpecs

const units = [
  agentBase,
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
