import keyObjectModuleFactory from 'utilities/keyObjectModuleFactory'

const {
  actionCreators,
  actionTypes,
  constants,
  globalSelectors,
  reducer,
} = keyObjectModuleFactory({
  actionPrefix: 'AGENT',
  initialValues: {
    agentDropdown: {},
  },
  keys: ['agentDropdown.:identifier.searchQuery'],
  name: 'agent',
})

export { actionCreators, actionTypes, constants, globalSelectors, reducer }
