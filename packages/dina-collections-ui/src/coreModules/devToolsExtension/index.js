const getDevToolsExtensionEnhancer = () => {
  if (process.env.NODE_ENV === 'development') {
    const { devToolsExtension } = window

    if (typeof devToolsExtension === 'function') {
      return devToolsExtension
    }
  }
  return null
}

const name = 'devToolsExtension'
const enhancer = getDevToolsExtensionEnhancer()

export { enhancer, name }
