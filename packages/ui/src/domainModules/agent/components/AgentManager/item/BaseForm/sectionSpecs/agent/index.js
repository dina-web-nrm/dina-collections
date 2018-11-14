import { recordHistoryEvents } from 'coreModules/form/components/units'
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
  agentContactDetails,
  agentBirthAndDeath,
  agentRoles,
  recordHistoryEvents,
]

export default {
  name: 'agent',
  units,
}
