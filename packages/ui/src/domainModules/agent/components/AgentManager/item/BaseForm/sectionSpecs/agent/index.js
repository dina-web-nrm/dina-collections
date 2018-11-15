import { recordHistoryEvents } from 'coreModules/form/components/units'
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
  recordHistoryEvents,
]

export default {
  name: 'agent',
  units,
}
