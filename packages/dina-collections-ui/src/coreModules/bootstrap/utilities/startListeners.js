export default function startListeners({ listenerMap, middlewareApi }) {
  Object.keys(listenerMap).forEach(moduleName => {
    const listener = listenerMap[moduleName]
    if (!listener.started && listener.start) {
      const stop = listener.start(middlewareApi)
      listener.stop = stop
      listener.started = true
    }
  })
}
