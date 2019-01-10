import objectPath from 'object-path'

const mapAcceptedTaxonNameError = syncErrors => {
  const acceptedTaxonNameErrorPath = objectPath.get(
    syncErrors,
    'acceptedTaxonName.fullPath'
  )

  if (acceptedTaxonNameErrorPath) {
    return {
      ...syncErrors,
      acceptedTaxonName: {
        id: {
          errorCode: 'REQUIRED',
          fullPath: `${acceptedTaxonNameErrorPath}.id`,
        },
      },
    }
  }

  return syncErrors
}

export default mapAcceptedTaxonNameError
