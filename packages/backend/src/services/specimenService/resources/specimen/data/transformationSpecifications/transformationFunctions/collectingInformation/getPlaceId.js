const getPlaceInformation = ({ src, migrator }) => {
  const continent = migrator.getValue({
    obj: src,
    path: 'objects.FieldNo_related.Continent_Ocean',
    strip: true,
  })

  const nation = migrator.getValue({
    obj: src,
    path: 'objects.FieldNo_related.Nation',
    strip: true,
  })

  const province = migrator.getValue({
    obj: src,
    path: 'objects.FieldNo_related.Province',
    strip: true,
  })

  return {
    continent,
    nation,
    province,
  }
}

module.exports = function getPlaceId({ getItemByTypeId, src, migrator }) {
  const { continent, nation, province } = getPlaceInformation({
    migrator,
    src,
  })

  const key = [continent, nation, province]
    .filter(group => {
      return !!group
    })
    .map(item => {
      return item.trim()
    })
    .join('->')

  if (!key) {
    return undefined
  }
  return getItemByTypeId({
    id: key,
    type: 'lookupPlace',
  }).then(place => {
    if (!place) {
      return undefined
    }

    return place.attributes.srcId
  })
}
