import getModuleConfig from './getModuleConfig'

export default function setModuleConfig({ action, state, moduleName }) {
  const config = getModuleConfig(action, moduleName)
  if (!config) {
    return state
  }
  return {
    ...state,
    ...config,
  }
}
