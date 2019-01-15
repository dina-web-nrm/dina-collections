import objectPath from 'object-path'

const mapParentError = syncErrors => {
  const parentErrorPath = objectPath.get(syncErrors, 'parent.fullPath')
  const parentIdErrorPath = objectPath.get(syncErrors, 'parent.id.fullPath')

  if (parentErrorPath || parentIdErrorPath) {
    return {
      ...syncErrors,
      parent: {
        id: {
          errorCode: 'REQUIRED',
          fullPath: 'parent.id',
        },
      },
    }
  }

  return syncErrors
}

export default mapParentError
