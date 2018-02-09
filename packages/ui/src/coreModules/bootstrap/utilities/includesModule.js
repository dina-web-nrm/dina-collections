export default function includesModule(action, moduleName) {
  if (
    action &&
    action.payload &&
    action.payload.modules &&
    action.payload.modules[moduleName]
  ) {
    return true
  }

  return false
}
