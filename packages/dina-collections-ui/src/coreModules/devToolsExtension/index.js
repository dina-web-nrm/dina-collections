import config from 'config'

const getDevToolsExtensionEnhancer = () => {
  if (config.isDevelopment) {
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
