import objectPath from 'object-path'

const mapParentError = syncErrors => {
  const parentErrorPath = objectPath.get(syncErrors, 'parent.fullPath')

  if (parentErrorPath) {
    return {
      ...syncErrors,
      parent: {
        id: {
          errorCode: 'REQUIRED',
          fullPath: `${parentErrorPath}.id`,
        },
      },
    }
  }

  return syncErrors
}

export default mapParentError
