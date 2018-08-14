const establishmentMeansValueMap = {
  'known age': 'known-age',
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
