export default function getModuleConfig(action, moduleName) {
  if (
    action &&
    action.payload &&
    action.payload.config &&
    action.payload.config[moduleName]
  ) {
    return action.payload.config[moduleName]
  }

  return {}
}
