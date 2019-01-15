import { AGENT_TYPE_OPTIONS } from 'domainModules/agent/constants'

const parts = [
  {
    componentName: 'TranslatedHeader',
    componentProps: {
      as: 'h2',
      textKey: 'headers.agent',
    },
  },
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
      columnProps: { width: 10 },
      fluid: true,
      type: 'text',
    },
    name: 'fullName',
    required: true,
    wrapInField: true,
  },
  {
    componentName: 'Input',
    componentProps: {
      columnProps: { width: 10 },
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
      resultPrefixTextKey: 'remarks.resultPrefix.agent',
    },
    name: 'remarks',
    wrapInField: true,
  },
]

export default {
  name: 'agentRoot',
  parts,
}
