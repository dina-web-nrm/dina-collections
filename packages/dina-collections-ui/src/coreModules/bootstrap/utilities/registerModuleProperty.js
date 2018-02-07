import objectPath from 'object-path'
import immutable from 'object-path-immutable'

export default function registerModuleProperty({
  action,
  customRegisterKey,
  ignoreModuleNames = false,
  property,
  scopeUnderModules = false,
  state,
}) {
  if (!(action && action.payload)) {
    return state
  }

  const statePath = scopeUnderModules
    ? `${customRegisterKey || property}.modules`
    : customRegisterKey || property
  const currentPropertyObject = objectPath.get(state, statePath)
  const modules = action.payload.modules || {}

  const mergedPropertyObject = Object.keys(modules).reduce(
    (obj, moduleName) => {
      const module = modules[moduleName]
      if (!module[property]) {
        return obj
      }

      if (ignoreModuleNames) {
        return {
          ...obj,
          ...module[property],
        }
      }

      return {
        ...obj,
        [moduleName]: module[property],
      }
    },
    currentPropertyObject || {}
  )

  if (mergedPropertyObject === currentPropertyObject) {
    return state
  }

  return immutable.set(state, statePath, mergedPropertyObject)
}
