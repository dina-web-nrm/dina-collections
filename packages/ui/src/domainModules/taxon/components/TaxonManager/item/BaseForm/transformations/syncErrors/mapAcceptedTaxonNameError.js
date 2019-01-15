import objectPath from 'object-path'

const mapAcceptedTaxonNameError = syncErrors => {
  const acceptedTaxonNameErrorPath =
    objectPath.get(syncErrors, 'acceptedTaxonName.fullPath') ||
    objectPath.get(syncErrors, 'acceptedTaxonName.id.fullPath')

  if (acceptedTaxonNameErrorPath) {
    return {
      ...syncErrors,
      acceptedTaxonName: {
        id: {
          errorCode: 'REQUIRED',
          fullPath: 'acceptedTaxonName.id',
        },
      },
    }
  }

  return syncErrors
}

export default mapAcceptedTaxonNameError
