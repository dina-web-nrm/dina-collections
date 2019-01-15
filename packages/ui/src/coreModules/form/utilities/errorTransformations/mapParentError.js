import objectPath from 'object-path'

const mapParentError = syncErrors => {
  const parentError = objectPath.get(syncErrors, 'parent')
  const parentIdError = objectPath.get(syncErrors, 'parent.id')

  if (parentError || parentIdError) {
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
