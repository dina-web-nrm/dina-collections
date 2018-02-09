import objectPath from 'object-path'
import immutable from 'object-path-immutable'

export default function unregisterModuleProperty({
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

  if (!(currentPropertyObject && Object.keys(currentPropertyObject).length)) {
    return state
  }

  const modules = action.payload.modules || {}

  const mergedPropertyObject = Object.keys(modules).reduce(
    (obj, moduleName) => {
      if (ignoreModuleNames && modules[moduleName][property]) {
        const newObj = {
          ...obj,
        }

        const keysToRemove = Object.keys(modules[moduleName][property])
        keysToRemove.forEach(key => delete newObj[key])

        return newObj
      }

      if (!obj[moduleName]) {
        return obj
      }

      const newObj = {
        ...obj,
      }

      delete newObj[moduleName] // eslint-disable-line no-param-reassign

      return newObj
    },
    currentPropertyObject
  )

  if (mergedPropertyObject === currentPropertyObject) {
    return state
  }

  return immutable.set(state, statePath, mergedPropertyObject)
}
