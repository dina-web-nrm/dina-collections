const setupListeners = ({ newModules }) => {
  return newModules.reduce((listeners, module) => {
    const listenerFactory = module.listener
    const moduleName = module.name
    if (listenerFactory && listenerFactory.start) {
      return {
        ...listeners,
        [moduleName]: {
          start: listenerFactory.start,
          started: false,
          stop: null,
        },
      }
    }
    return listeners
  }, {})
}

export default function createListeners({
  listenerMap,
  newModules = [],
  removeModules = [],
}) {
  const newListeners = setupListeners({ newModules })
  const newListenerMap = {
    ...listenerMap,
    ...newListeners,
  }

  removeModules.forEach(module => {
    const { name } = module
    if (newListenerMap[name]) {
      const { stop } = newListenerMap[name]
      if (stop) {
        stop()
      }
      delete newListenerMap[name] // eslint-disable-line no-param-reassign
    }
  })
  return newListenerMap
}
