import { capitalizeFirstLetter } from 'common/es5/stringFormatters'

export const MODULE_NAME = 'agent'
export const ALL = 'all'
export const PERSON = 'person'
export const ORGANIZATION = 'organization'
export const OTHER = 'other'
export const UNKNOWN = 'unknown'

const agentTypes = [PERSON, ORGANIZATION, OTHER, UNKNOWN]

export const AGENT_TYPE_OPTIONS = agentTypes.map(agentType => {
  return {
    key: agentType,
    text: capitalizeFirstLetter(agentType),
    value: agentType,
  }
})
