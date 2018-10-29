import { AGENT_TYPE_OPTIONS } from 'domainModules/agent/constants'

const parts = [
  {
    componentName: 'Radio',
    componentProps: {
      labelKey: 'modules.agent.fieldLabels.agentType',
      radioOptions: AGENT_TYPE_OPTIONS,
    },
    name: 'agentType',
    wrapInField: true,
  },
  {
    componentName: 'Input',
    componentProps: {
      fluid: true,
      type: 'text',
    },
    name: 'fullName',
    wrapInField: true,
  },
  {
    componentName: 'Input',
    componentProps: {
      fluid: true,
      type: 'text',
    },
    name: 'disambiguatingDescription',
    wrapInField: true,
  },
  {
    componentName: 'Remarks',
    componentProps: {
      emptyStateTextKey: 'remarks.emptyState.agent',
    },
    name: 'remarks',
    wrapInField: true,
  },
]

export default {
  name: 'agentBase',
  parts,
}
