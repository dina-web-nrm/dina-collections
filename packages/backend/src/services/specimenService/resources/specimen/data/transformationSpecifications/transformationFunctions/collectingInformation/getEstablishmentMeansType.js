const establishmentMeansValueMap = {
  // TODO: Update with real keys from data
  captive: 'captive',
  'wild and introduced': 'wild-and-introduced',
  'wild and native': 'wild-and-native',
}

const mapEstablishmentMeansType = originStatus => {
  if (!originStatus) {
    return originStatus
  }
  const lowerCaseValue = originStatus.toLowerCase()
  return establishmentMeansValueMap[lowerCaseValue] || lowerCaseValue
}

module.exports = function getCollectorAgent({
  getItemByTypeId,
  src,
  migrator,
}) {
  const originStatus = migrator.getValue({
    obj: src,
    path: 'objects.OriginStatus',
    strip: true,
  })

  if (!originStatus) {
    return Promise.resolve(undefined)
  }

  const mappedEstablishmentMeans = mapEstablishmentMeansType(originStatus)

  return getItemByTypeId({
    id: mappedEstablishmentMeans,
    type: 'lookupEstablishmentMeansType',
  }).then(item => {
    if (!item) {
      return undefined
    }
    return item.attributes.srcId
  })
}
