const parts = [
  {
    componentName: 'TranslatedHeader',
    componentProps: {
      as: 'h3',
      textKey: 'headers.roles',
    },
  },
  {
    componentName: 'AgentRolesAccordion',
    containsReduxFormField: true,
    name: 'roles',
    relativeNames: ['affiliation.name', 'dateRange', 'name'],
  },
]

export default {
  name: 'agentRoles',
  parts,
}
