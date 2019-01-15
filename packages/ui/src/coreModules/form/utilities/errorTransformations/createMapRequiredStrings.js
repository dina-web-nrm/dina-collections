import objectPath from 'object-path'

const createMapRequiredStrings = (fieldPaths = []) => syncErrors => {
  const transformedSyncErrors = { ...syncErrors }

  fieldPaths.forEach(path => {
    const errorPath = objectPath.get(syncErrors, `${path}.fullPath`)

    if (errorPath) {
      objectPath.set(transformedSyncErrors, path, {
        errorCode: 'REQUIRED',
        fullPath: errorPath,
      })
    }
  })

  return transformedSyncErrors
}

export default createMapRequiredStrings
